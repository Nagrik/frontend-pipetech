#!/usr/bin/env node
import { config } from 'dotenv'
import handler from 'serve-handler'
import http from 'http'
// import esbuildServe from 'esbuild-serve';
import fs from 'fs'
import path from 'path'
import esbuild from 'esbuild'
import { Readable } from 'stream'
import chokidar from 'chokidar'

const conf = config()
const def = {}
Object.entries(conf.parsed).forEach(it => {
    def[`process.env.${it[0]}`] = JSON.stringify(it[1])
})
console.log(def)

esbuild.build({
    logLevel: 'error',
    entryPoints: ['src/index.tsx'],
    bundle: true,
    outdir: 'www',
    define: def,
    watch: true,
    loader: {
        '.png': 'file',
        '.svg': 'file',
        '.woff': 'file',
        '.woff2': 'file',
        '.ttf': 'file',
        '.eot': 'file',
    }
})

const htmlMimeTypes = new Set(["html", "htm", "shtml"]);
const eventSource = '/__servie';

const injectCode = `
<script async>
(() => (new EventSource('${eventSource}').onmessage = () => location.reload()))();
</script>`

export const injectContent = content => {
    const index = content.indexOf('</body>');
    const start = content.slice(0, index + 7);
    const end = content.slice(index + 7);

    return start + injectCode + end;
};

const clients = []
const server = http.createServer(async (request, response) => {
    // You pass two more arguments for config and middleware
    // More details here: https://github.com/vercel/serve-handler#options
    console.log(request.url)
    if (request.url === eventSource) {
        console.log('ping')
        const client = response.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive'
        })
        clients.push(client)
        return
    }

    return handler(
        request,
        response,
        { public: "./www", rewrites: [{ source: "**", destination: "index.html" }] },
        {
            lstat(filePath) {
                const extension = path.extname(filePath).toLowerCase().slice(1);
                const isHtml = htmlMimeTypes.has(extension)
                const result = fs.lstatSync(filePath)
                if (!isHtml) return result

                result.size = Buffer.byteLength(injectCode) + result.size
                return result
            },
            createReadStream(filePath, config) {
                const extension = path.extname(filePath).toLowerCase().slice(1);
                const isHtml = htmlMimeTypes.has(extension);

                if (!isHtml) return fs.createReadStream(filePath, config)
                const fileContent = fs.readFileSync(filePath, config).toString()
                const injected = injectContent(fileContent)
                return Readable.from(injected)
            }
        }
    )
})

const update = () => {
    clients.forEach(response => response.write('data: update\n\n'))
    clients.length = 0
}

chokidar.watch('www').on('all', (event, path) => {
    update()
})

server.listen(3001, () => {
    console.log('Running at http://localhost:3001')
})
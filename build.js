import esbuild from 'esbuild'
import fs from 'fs'

const config = {
    entryPoints: ['./src/index.tsx'],
    bundle: true,
    minify: true,
    sourcemap: true,
    loader: {
        '.png': 'file',
        '.svg': 'file',
        '.woff': 'file',
        '.woff2': 'file',
        '.ttf': 'file',
        '.eot': 'file',
    },
    outdir: './dist',
    define: {
        'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
        'process.env.BASE_URL': '"https://api.lambda-team.club"',
    }
}

esbuild.buildSync(config)

const copyHTMLErr = (err) => {
    if (err) throw err;
    console.log('./src/index.html was copied to ./dist/index.html');
}

const copyFaviconIconErr = (err) => {
    if (err) throw err;
    console.log('favicon.ico was copied');
}

fs.copyFile('./src/index.html', './dist/index.html', copyHTMLErr)
fs.copyFile('./src/favicon.ico', './dist/favicon.ico', copyFaviconIconErr)
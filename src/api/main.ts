import HttpClient from './http-client';
import {UserResponse} from "@/api/main-protected";

export interface SendEmailBody {
    email: string
    password: string
}

export interface RefreshResponse {
    accessToken: string,
    refreshToken: string,
}

export interface OTPValidateResponse {
    access_token: string,
    refresh_token: string,
}

class Main extends HttpClient {
    private static instanceCached: Main;

    private constructor() {
        super(process.env.BASE_URL);
    }

    static getInstance = () => {
        if (!Main.instanceCached) {
            Main.instanceCached = new Main();
        }

        return Main.instanceCached;
    };

    public sendEmail = (body: SendEmailBody) => this.instance.post<OTPValidateResponse>('/super-admin/login', body);

    public getTokens = (body: { email: string, otp: string }) => this.instance.post<OTPValidateResponse>('/otp/validate', body);

    public refresh = (body:{ refreshToken: string }) => this.instance.post<RefreshResponse>('/login/refresh', body);

    public login = (body:{ email: string, password:string }) => this.instance.post<{refreshToken:string, accessToken:string, id:number}>('/login', body);



}

export default Main;

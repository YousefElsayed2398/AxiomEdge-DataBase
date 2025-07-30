import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(body: {
        username: string;
        password: string;
    }): Promise<{
        message: string;
        username: string;
    }>;
    login(body: {
        username: string;
        password: string;
    }): Promise<{
        access_token: any;
    }>;
    getProfile(req: any): any;
}

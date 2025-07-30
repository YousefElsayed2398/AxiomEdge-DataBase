import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from 'src/common/dto/student.entity';
export declare class AuthService {
    private jwtService;
    private userRepo;
    constructor(jwtService: JwtService, userRepo: Repository<User>);
    register(username: string, password: string): Promise<{
        message: string;
        username: string;
    }>;
    login(username: string, password: string): Promise<{
        access_token: any;
    }>;
    vaildateUser(userId: number): Promise<User>;
}

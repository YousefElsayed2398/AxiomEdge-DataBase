import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { User } from 'src/common/dto/student.entity';
import { error } from 'console';
import { access } from 'fs';


@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, @InjectRepository(User) private userRepo: Repository<User>) { }


    async register(username: string, password: string) {
        const hashed = await bcrypt.hash(password, 10);
        const user = this.userRepo.create({ username, password: hashed })
        await this.userRepo.save(user);
        return { message: 'User Created', username: user.username };
    }

    async login(username: string, password: string) {
        const user = await this.userRepo.findOne({ where: { username } });
        if (!user) throw new Error('User not Found In systen');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Invaild Password')

        const payload = { sub: user.id, username: user.username };
        const token = this.jwtService.sign(payload);
        return { access_token: token };

    }
    async vaildateUser(userId: number) {
        return this.userRepo.findOne({ where: { id: Equal(userId) } })
    }

}

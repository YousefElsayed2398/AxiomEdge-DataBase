import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Student } from 'src/common/dto/student.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Student]),
        AuthModule
    ],
    controllers: [StudentsController],
    providers: [StudentsService],
    exports: [StudentsService]
})
export class StudentsModule { }

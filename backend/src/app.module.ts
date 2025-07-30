import { Module } from '@nestjs/common';
import { StudentsModule } from './students/students.module';
import { StudentsController } from './students/students.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';


@Module({
    imports: [StudentsModule, TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        database: 'task-managment',
        username: 'postgres',
        password: 'llkk',
        autoLoadEntities: true,
        synchronize: true,
    }), AuthModule],

})
export class AppModule { }

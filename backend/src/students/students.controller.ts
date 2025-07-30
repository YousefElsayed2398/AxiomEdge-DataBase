import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto, UpdateStudentDto } from '../common/dto/student.dto';
import { Student } from 'src/common/dto/student.entity';
import { promises } from 'dns';
import { AuthGuard } from '@nestjs/passport';
import { jwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('api/students')
@UseGuards(jwtAuthGuard)
export class StudentsController {
    constructor(private readonly studentsService: StudentsService) { }



    @Get() // completed - i think
    findAll(): Promise<Student[]> {
        return this.studentsService.getAllStudents();
    }

    @Get(':id') // Completed - I think
    findOne(@Param('id') id: string): Promise<Student> {
        return this.studentsService.getStudentByID(id);
    }

    @Post() // completed - I think
    create(@Body() createStudentDto: CreateStudentDto): Promise<Student> {
        return this.studentsService.create(createStudentDto);
    }

    @Put(':id') // completed - i think
    update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto): Promise<Student> {
        return this.studentsService.update(id, updateStudentDto);
    }


    @Delete(':id') // Completed - I think
    remove(@Param('id') id: string): Promise<void> {

        return this.studentsService.removeStudnet(id);

    }




}
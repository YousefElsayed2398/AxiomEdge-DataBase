import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto, UpdateStudentDto } from '../common/dto/student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/common/dto/student.entity';
import { Repository } from 'typeorm';


@Injectable()
export class StudentsService {

    constructor(
        @InjectRepository(Student)
        private studentRepo: Repository<Student>,
    ) { }

    // private students: Student[] = [];

    async create(createStudentDto: CreateStudentDto): Promise<Student> {
        const newStudent = await this.studentRepo.create(createStudentDto);
        // con``sole.log('this is the ID: ', newStudent.id)
        return await this.studentRepo.save(newStudent);
    }

    async removeStudnet(id: string): Promise<void> {

        const delStudent = await this.studentRepo.delete(id)
        if (delStudent.affected === 0) throw new NotFoundException('There was no student with this ID to Delete');
        console.log(`Student with id: ${id} was deleted succesfuly`);

    }



    async update(id: string, updateStudentDto: UpdateStudentDto): Promise<Student> {
        const existingStudent = await this.studentRepo.findOne({ where: { id } });
        if (!existingStudent) {
            throw new NotFoundException(`Student with id ${id} not found`)
        }
        const newStd = this.studentRepo.merge(existingStudent, updateStudentDto)
        return this.studentRepo.save(newStd);
    }


    async getStudentByID(id: string): Promise<Student> {
        try {
            return await this.studentRepo.findOne({ where: { id } });
        } catch {
            throw new NotFoundException(`Could Find Student with id: ${id} try Again`);
        }

    }


    async getAllStudents(): Promise<Student[]> {
        try {
            return await this.studentRepo.find();
        } catch {
            throw new NotFoundException(`Your list of Students Could Not be Found`);
        }


    }

    //############################# Add to Reop above this line ###############################################

    // remove(id: string): boolean {
    //     const index = this.students.findIndex(student => student.id === id);
    //     if (index !== -1) {
    //         this.students.splice(index, 1);
    //         return true;
    //     }
    //     return false;
    // }

    private generateId(): string {
        return Math.random().toString(36).substr(2, 9);
    }
}

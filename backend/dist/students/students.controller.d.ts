import { StudentsService } from './students.service';
import { CreateStudentDto, UpdateStudentDto } from '../common/dto/student.dto';
import { Student } from 'src/common/dto/student.entity';
export declare class StudentsController {
    private readonly studentsService;
    constructor(studentsService: StudentsService);
    findAll(): Promise<Student[]>;
    findOne(id: string): Promise<Student>;
    create(createStudentDto: CreateStudentDto): Promise<Student>;
    update(id: string, updateStudentDto: UpdateStudentDto): Promise<Student>;
    remove(id: string): Promise<void>;
}

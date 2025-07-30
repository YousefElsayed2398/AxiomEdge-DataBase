import { CreateStudentDto, UpdateStudentDto } from '../common/dto/student.dto';
import { Student } from 'src/common/dto/student.entity';
import { Repository } from 'typeorm';
export declare class StudentsService {
    private studentRepo;
    constructor(studentRepo: Repository<Student>);
    create(createStudentDto: CreateStudentDto): Promise<Student>;
    removeStudnet(id: string): Promise<void>;
    update(id: string, updateStudentDto: UpdateStudentDto): Promise<Student>;
    getStudentByID(id: string): Promise<Student>;
    getAllStudents(): Promise<Student[]>;
    private generateId;
}

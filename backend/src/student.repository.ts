import { EntityRepository, Repository } from "typeorm";
import { Student } from "./common/dto/student.entity";


@EntityRepository(Student)
export class studnetRepo extends Repository<Student> {

}
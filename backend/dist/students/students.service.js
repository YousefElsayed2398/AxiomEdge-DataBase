"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const student_entity_1 = require("../common/dto/student.entity");
const typeorm_2 = require("typeorm");
let StudentsService = class StudentsService {
    constructor(studentRepo) {
        this.studentRepo = studentRepo;
    }
    async create(createStudentDto) {
        const newStudent = await this.studentRepo.create(createStudentDto);
        return await this.studentRepo.save(newStudent);
    }
    async removeStudnet(id) {
        const delStudent = await this.studentRepo.delete(id);
        if (delStudent.affected === 0)
            throw new common_1.NotFoundException('There was no student with this ID to Delete');
        console.log(`Student with id: ${id} was deleted succesfuly`);
    }
    async update(id, updateStudentDto) {
        const existingStudent = await this.studentRepo.findOne({ where: { id } });
        if (!existingStudent) {
            throw new common_1.NotFoundException(`Student with id ${id} not found`);
        }
        const newStd = this.studentRepo.merge(existingStudent, updateStudentDto);
        return this.studentRepo.save(newStd);
    }
    async getStudentByID(id) {
        try {
            return await this.studentRepo.findOne({ where: { id } });
        }
        catch (_a) {
            throw new common_1.NotFoundException(`Could Find Student with id: ${id} try Again`);
        }
    }
    async getAllStudents() {
        try {
            return await this.studentRepo.find();
        }
        catch (_a) {
            throw new common_1.NotFoundException(`Your list of Students Could Not be Found`);
        }
    }
    generateId() {
        return Math.random().toString(36).substr(2, 9);
    }
};
exports.StudentsService = StudentsService;
exports.StudentsService = StudentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], StudentsService);
//# sourceMappingURL=students.service.js.map
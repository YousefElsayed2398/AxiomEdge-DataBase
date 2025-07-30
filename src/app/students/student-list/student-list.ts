import { Component, OnInit } from '@angular/core';
import { StudentService, Student } from '../../student.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-student-list',
  imports: [FormsModule, CommonModule],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css'
})



export class StudentList implements OnInit {
  students: Student[] = [];
  showForm: boolean = false;
  showEditForm: boolean = false;
  editingStudentId: string = '';
  editByID: boolean = false;
  IdInputed: string = '';

  newStudent: Student = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    gender: 'Male',
    grade: '',
    country: ''
  };

  editStudent: Student = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    gender: 'Male',
    grade: '',
    country: ''
  };

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.getStudents().subscribe({
      next: (students) => { this.students = students; console.log(this.students); },
      error: (error) => {
        console.error('Error loading students:', error);
      }
    });
  }

  ngDeleteById(id: string): void {
    this.studentService.deleteStudent(id).subscribe({ next: () => { this.loadStudents(); }, error: (error) => { console.error('Error deleting student:', error); } });
  }

  ngAddNewStudent(student: Student): void {
    this.studentService.addStudent(student).subscribe({
      next: () => {
        this.loadStudents(); // Reload the students list
      },
      error: (error) => {
        console.error('Error adding student:', error);
      }
    });
  }

  editStudentList(id: string, newStudent: Student): void {
    this.studentService.updateStudent(id, newStudent).subscribe({
      next: () => {
        this.loadStudents(); // Reload the students list
      },
      error: (error) => {
        console.error('Error updating student:', error);
      }
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (this.showForm) {
      this.resetForm();
    }
  }

  resetForm(): void {
    this.newStudent = {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: 'Male',
      grade: '',
      country: ''
    };
  }

  onSubmit(): void {
    if (this.isFormValid()) {
      this.studentService.addStudent(this.newStudent).subscribe({
        next: () => {
          this.loadStudents(); // Reload the students list
          this.resetForm();
          this.showForm = false;
        },
        error: (error) => {
          console.error('Error adding student:', error);
        }
      });
    }
  }

  isFormValid(): boolean {
    return this.newStudent.firstName.trim() !== '' &&
      this.newStudent.lastName.trim() !== '' &&
      this.newStudent.email.trim() !== '' &&
      this.newStudent.dob.trim() !== '' &&
      this.newStudent.grade.trim() !== '' &&
      this.newStudent.country.trim() !== '';
  }

  // Edit functionality methods
  startEdit(student: Student): void {
    this.editingStudentId = student.id;
    this.editStudent = { ...student };
    this.showEditForm = true;
    this.showForm = false; // Hide add form if open
  }

  cancelEdit(): void {
    this.showEditForm = false;
    this.editingStudentId = '';
    this.resetEditForm();
  }

  resetEditForm(): void {
    this.editStudent = {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: 'Male',
      grade: '',
      country: ''
    };
  }

  onEditSubmit(): void {
    if (this.isEditFormValid()) {
      this.studentService.updateStudent(this.editingStudentId, this.editStudent).subscribe({
        next: () => {
          this.loadStudents(); // Reload the students list
          this.resetEditForm();
          this.showEditForm = false;
          this.editingStudentId = '';
        },
        error: (error) => {
          console.error('Error updating student:', error);
        }
      });
    }
  }

  onEditbyIDSubmit(id: string) {
    this.editByID = true;
    this.studentService.getAtId(id).subscribe({
      next: (student) => {
        console.log('Student found:', student);
        // You can use the student data here
        // For example, populate the edit form:
        this.editStudent = { ...student };
        this.editingStudentId = student.id;
        this.showEditForm = true;
      },
      error: (error) => {
        console.error('Error fetching student:', error);
        alert('Student not found or error occurred');
      }
    });
  }


  isEditFormValid(): boolean {
    return this.editStudent.firstName.trim() !== '' &&
      this.editStudent.lastName.trim() !== '' &&
      this.editStudent.email.trim() !== '' &&
      this.editStudent.dob.trim() !== '' &&
      this.editStudent.grade.trim() !== '' &&
      this.editStudent.country.trim() !== '';
  }



}

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface Student {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    dob: string;
    gender: 'Male' | 'Female';
    grade: string;
    country: string;
}

@Injectable({ providedIn: 'root' })
export class StudentService {
    private readonly baseUrl = 'http://localhost:3000/api/students';

    constructor(private http: HttpClient) { }

    getAtId(id: string): Observable<Student> {
        return this.http.get<Student>(`${this.baseUrl}/${id}`);
    }

    getStudents(): Observable<Student[]> {
        return this.http.get<Student[]>(this.baseUrl);
    }

    addStudent(student: Omit<Student, 'id'>): Observable<Student> {
        return this.http.post<Student>(this.baseUrl, student);
    }

    updateStudent(id: string, updated: Omit<Student, 'id'>): Observable<Student> {
        return this.http.put<Student>(`${this.baseUrl}/${id}`, updated);
    }

    deleteStudent(id: string): Observable<{ message: string }> {
        return this.http.delete<{ message: string }>(`${this.baseUrl}/${id}`);
    }
}

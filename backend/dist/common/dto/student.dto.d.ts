export declare class CreateStudentDto {
    firstName: string;
    lastName: string;
    email: string;
    dob: string;
    gender: 'Male' | 'Female';
    grade: string;
    country: string;
}
export declare class UpdateStudentDto {
    firstName?: string;
    lastName?: string;
    email?: string;
    dob?: string;
    gender?: 'Male' | 'Female';
    grade?: string;
    country?: string;
}

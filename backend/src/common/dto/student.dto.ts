import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

// export interface Student {
//     id: string;
//     firstName: string;
//     lastName: string;
//     email: string;
//     dob: string; // use ISO format: YYYY-MM-DD
//     gender: 'Male' | 'Female';
//     grade: string;
//     country: string;
// }




export class CreateStudentDto {
    @IsString()
    @IsNotEmpty()
    firstName: string;
    @IsString()
    @IsNotEmpty()
    lastName: string;
    @IsString()
    @IsNotEmpty()
    email: string;
    @IsString()
    @IsNotEmpty()
    dob: string;
    @IsString()
    @IsNotEmpty()
    gender: 'Male' | 'Female';
    @IsString()
    @IsNotEmpty()
    grade: string;
    @IsString()
    @IsNotEmpty()
    country: string;
}

export class UpdateStudentDto {

    @IsOptional()
    @IsString()
    firstName?: string;

    @IsOptional()
    @IsString()
    lastName?: string;

    @IsOptional()
    @IsString()
    email?: string;

    @IsOptional()
    @IsString()
    dob?: string;

    @IsOptional()
    @IsString()
    gender?: 'Male' | 'Female';

    @IsOptional()
    @IsString()
    grade?: string;

    @IsOptional()
    @IsString()
    country?: string;
}

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { nanoid } from 'nanoid'

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;
}

@Entity()
export class Student {
    @PrimaryGeneratedColumn(nanoid(5))
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: false })
    email: string;

    @Column()
    dob: string; // use ISO format: YYYY-MM-DD

    @Column()
    gender: 'Male' | 'Female';

    @Column()
    grade: string;

    @Column()
    country: string;
}


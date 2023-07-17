import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm'

export class Admin {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    uid: string;

    @Column()
    name: string;

    @Column()
    password: string;
}

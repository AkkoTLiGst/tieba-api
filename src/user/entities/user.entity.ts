import { Tiezi } from 'src/tiezi/entities/tiezi.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, JoinColumn } from 'typeorm'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    
    @Column()
    userId: string;

    @Column()
    userName: string;

    @Column()
    password: string;

    @Column()
    mobile: string;

    @Column()
    email: string;

    @Column()
    photoUser: string;


    @OneToMany(() => Tiezi, (tiezi) => tiezi.user)
    tiezis: Tiezi[];

}

import { type } from 'os';
import { Tiezi } from 'src/tiezi/entities/tiezi.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm'

@Entity()
export class TieziLists {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'text' })
    tiezi: string;

    @Column()
    userId: number;

    @Column()
    baId: number
}

import { type } from 'os';
import { Tiezi } from 'src/tiezi/entities/tiezi.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm'

@Entity()
export class CommentLists {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    commentId: number;

    @Column()
    userId: number;

    @Column()
    tieziId: number
}

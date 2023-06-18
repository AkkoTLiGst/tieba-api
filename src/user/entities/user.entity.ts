import { Comment } from 'src/comment/entities/comment.entity';
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

    @Column({ nullable: true })
    tiezisID: number;


    // 帖子
    @OneToMany(() => Tiezi, (tiezi) => tiezi.user)
    tiezis: Tiezi[];

    // 评论
    @OneToMany(() => Comment, (commnet) => commnet.user)
    comment: Comment[];

    // 贴吧

}

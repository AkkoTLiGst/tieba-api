import { Comment } from 'src/comment/entities/comment.entity';
import { Tieba } from 'src/tiebas/entities/tieba.entity';
import { Tiezi } from 'src/tiezi/entities/tiezi.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, JoinColumn, ManyToMany, JoinTable } from 'typeorm'

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

    // 用户简介
    @Column()
    aboutMe: string;

    // 帖子
    @OneToMany(() => Tiezi, (tiezi) => tiezi.user)
    tiezis: Tiezi[];

    // 评论
    @OneToMany(() => Comment, (commnet) => commnet.user)
    comment: Comment[];

    // 贴吧
    @ManyToMany(() => Tieba, (tieba) => tieba.user)
    @JoinTable()
    tieba: Tieba[];
}

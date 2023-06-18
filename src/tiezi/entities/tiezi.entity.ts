import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm'
import { Tieba } from 'src/tiebas/entities/tieba.entity';
import { User } from 'src/user/entities/user.entity';
import { Comment } from 'src/comment/entities/comment.entity';

@Entity()
export class Tiezi {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    threadTitle: string;

    @Column()
    content: string

    @Column()
    tieziImg: string;
    
    @CreateDateColumn({type: 'timestamp'})
    createTimeTiezi: Date;

    @Column()
    createrId: number;

    @Column()
    ctieBaId: number;

    // 点赞量
    @Column()
    thumbUp: number;

    // 收藏量
    @Column()
    star: number;

    // 评论数量
    @Column()
    commentsNum: number;

    // 多表联查——用户
    @ManyToOne(() => User, (user) => user.tiezis)
    @JoinColumn()
    user: User

    // 多表联查——贴吧
    @ManyToOne(() => Tieba, (tieba) => tieba.tiezis)
    @JoinColumn()
    tieba: Tieba;

    // 多表联查——评论
    @OneToMany(() => Comment, (commnet) => commnet.tiezi)
    comment: Comment[];

}

import { Tiezi } from 'src/tiezi/entities/tiezi.entity';
import { User } from 'src/user/entities/user.entity';
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn} from 'typeorm'

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    // 评论内容
    @Column()
    comment: string;

    // 发表时间
    @CreateDateColumn({type: 'timestamp'})
    createTimeTiezi: Date;

    // 评论图片
    @Column()
    tieziImg: string;

    // 点赞数量
    thumbUp: number;

    // 楼层数
    @Column()
    floor: number;

    // 发表人
    @ManyToOne(() => User, (user) => user.comment)
    @JoinColumn()
    user: User;

    // 对应帖子
    @ManyToOne(() => Tiezi, (tiezi) => tiezi.comment)
    @JoinColumn()
    tiezi: Tiezi;
}

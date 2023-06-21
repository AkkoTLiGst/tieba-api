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

    // 评论者
    createrId: number;

    // 对应帖子ID
    tieziId: number;

    @ManyToOne(() => User, (user) => user.comment)
    @JoinColumn()
    user: User;

    @ManyToOne(() => Tiezi, (tiezi) => tiezi.comment)
    @JoinColumn()
    tiezi: Tiezi;
}

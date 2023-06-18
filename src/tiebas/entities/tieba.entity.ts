import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, ManyToMany} from 'typeorm'
import { Tiezi } from 'src/tiezi/entities/tiezi.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Tieba {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tiebaName: string;

    // 简介
    @Column()
    aboutTieba: string;

    // 关注
    @Column()
    subscribeTieba: number;

    // 贴吧头像
    @Column()
    photoTieba: string;

    // 创建时间
    @CreateDateColumn()
    createTimeTieba: Date;

    // 多表联查——帖子
    @OneToMany(() => Tiezi, (tiezi) => tiezi.tieba)
    tiezis: Tiezi[];

    // 用户
    @ManyToMany(() => User, (user) => user.tieba)
    user: User;
}

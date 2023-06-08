import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm'
import { Tieba } from 'src/tiebas/entities/tieba.entity';

@Entity()
export class Tiezi {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    threadTitle: string;

    @Column()
    content: string;

    @Column()
    tieziImg: null | string;

    @CreateDateColumn()
    createTimeTiezi: Date;

    // 多表联查——用户
    @Column()
    createrId: number;

    // 多表联查——贴吧
    @ManyToOne(() => Tieba, (tieba) => tieba.tiezis)
    @JoinColumn()
    tieba: Tieba;

}

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm'

@Entity()
export class TieziLists {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tieziId: number;

    @Column()
    userId: number;

    @Column()
    baId: number
}

import { User } from "src/user/entity/user.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'ip'})
export class IP extends BaseEntity {
    @PrimaryGeneratedColumn()
    ip_id: number;

    @Column()
    ip: string;

    @ManyToOne(()=> User, user => user.ip, {eager: false})
    @JoinColumn({name: "user_id"})
    user: User;
}
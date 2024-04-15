import { User } from "src/user/entity/user.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'subscription'})
export class Subscription extends BaseEntity {
    @PrimaryGeneratedColumn()
    subscription_id: number;

    @Column()
    subscription_date: string;

    @Column()
    start_date: string;

    @Column()
    end_date: string;

    @ManyToOne(()=> User, user => user.subscription, {eager: false})
    @JoinColumn({name: "user_id"})
    user: User;
}
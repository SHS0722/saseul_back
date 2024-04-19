import { IP } from "src/ip/entity/ip.entity";
import { Subscription } from "src/subscription/entity/subscription.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({name: 'user'})
@Unique(['user_email','user_phone'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column()
    user_email: string;

    @Column()
    user_name: string;

    @Column()
    user_phone: string;

    @Column()
    user_pw: string;

    @Column()
    join_date: string;

    @OneToMany(() => Subscription, subscription => subscription.user,{eager: false})
    subscription: Subscription;

    @OneToMany(() => IP, ip => ip.user,{eager: false})
    ip: IP;
}
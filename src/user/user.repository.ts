import { CustomRepository } from "src/core/typeorm-ex.decorator";
import { User } from "./entity/user.entity";
import { Repository } from "typeorm";
import { CreateUserDTO } from "./dto/user.dto";
import { ConflictException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { GetUserQuery } from "./dto/get_users.dto";

@CustomRepository(User)
export class UserRepository extends Repository<User> {
    async getUserById(user_email: string): Promise<User> {
        const user = await this.findOne({ where : { user_email} });

        return user;
    }

    async getUserByPhone(user_phone: string): Promise<User> {
        const user = await this.findOne({ where : { user_phone} });

        return user;
    }

    async createUser(createUserDTO: CreateUserDTO){
        const user = this.create(createUserDTO);

        try{
            return await this.save(user);
        }catch(error){
            console.log(error)
            if(error.code === 'ER_DUP_ENTRY') {
                throw new ConflictException('Existing username');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async getUser(param: GetUserQuery){
        const { page, search } = param;
        const query = this.createQueryBuilder('user').orderBy('user.join_date');
        if(search !== ''){
            query.andWhere('user.user_name LIKE :user_name', {user_name: `%${search}%`})
                 .orWhere('user.user_email LIKE :user_email', {user_email: `%${search}%`})
        }
        query.orderBy('user.join_date', 'DESC'); 
        const count = await query.getCount();

        const skip = (page - 1) * 10;
        query.skip(skip).take(10);

        const totalPages = Math.ceil(count / 10);
        const users = await query.getMany();

        return {users , totalPages};
    }
}
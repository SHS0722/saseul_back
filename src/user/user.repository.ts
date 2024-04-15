import { CustomRepository } from "src/core/typeorm-ex.decorator";
import { User } from "./entity/user.entity";
import { Repository } from "typeorm";
import { CreateUserDTO } from "./dto/user.dto";
import { ConflictException, InternalServerErrorException, NotFoundException } from "@nestjs/common";

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
}
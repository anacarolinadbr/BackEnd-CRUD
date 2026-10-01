import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";

export class UserService {

    private userRepository = AppDataSource.getRepository(User);

    async findAll() {
        return await this.userRepository.find();
    }

    async findById(id: number) {

        return await this.userRepository.findOne({
            where: {
                id
            }
        });
    }

    async create(name: string, email: string) {

        const user = this.userRepository.create({
            name,
            email
        });

        return await this.userRepository.save(user);
    }

    async update(
        id: number,
        name: string,
        email: string
    ) {

        const user = await this.findById(id);

        if (!user) {
            return null;
        }

        user.name = name;
        user.email = email;

        return await this.userRepository.save(user);
    }

    async delete(id: number) {

        const user = await this.findById(id);

        if (!user) {
            return false;
        }

        await this.userRepository.remove(user);

        return true;
    }
}
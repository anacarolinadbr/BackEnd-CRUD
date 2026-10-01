"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const data_source_1 = require("../config/data-source");
const User_1 = require("../entities/User");
class UserService {
    userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    async findAll() {
        return await this.userRepository.find();
    }
    async findById(id) {
        return await this.userRepository.findOne({
            where: {
                id
            }
        });
    }
    async create(name, email) {
        const user = this.userRepository.create({
            name,
            email
        });
        return await this.userRepository.save(user);
    }
    async update(id, name, email) {
        const user = await this.findById(id);
        if (!user) {
            return null;
        }
        user.name = name;
        user.email = email;
        return await this.userRepository.save(user);
    }
    async delete(id) {
        const user = await this.findById(id);
        if (!user) {
            return false;
        }
        await this.userRepository.remove(user);
        return true;
    }
}
exports.UserService = UserService;

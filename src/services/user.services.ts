import { User } from "../models/user.model";
import { NotFoundError } from "../errors/not-found.error";
import { UserRepository } from "../repositories/user.repository";

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async getAll(): Promise<User[]> {
        return this.userRepository.getAll();
    }

    async getById(id: string): Promise<User> {
        const user = await this.userRepository.getById(id);

        if (!user) {
            throw new NotFoundError("User is not found!");
        }

        return user;
    }

    async save(user: User): Promise<string> {
        return await this.userRepository.save(user);
    }

    async update(user: User): Promise<void> {
        let _user = await this.userRepository.getById(user.id);

        if (!_user) {
            throw new NotFoundError("User is not found!");
        }

        _user = user;
        await this.userRepository.update(_user);
    }

    async delete(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }

}
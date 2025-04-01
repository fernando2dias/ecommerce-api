import { User } from "../models/user.model.js";
import { NotFoundError } from "../errors/not-found.error.js";
import { UserRepository } from "../repositories/user.repository.js";
import { AuthService } from "./auth.service.js";

export class UserService {
    private userRepository: UserRepository;
    private authService: AuthService;

    constructor() {
        this.userRepository = new UserRepository();
        this.authService = new AuthService();
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
        const userAuth = this.authService.create(user);
        user.id = (await userAuth).uid;
        await this.userRepository.update(user);

        return user.name;
    }

    async update(user: User): Promise<void> {
        let _user = await this.getById(user.id);

        _user = user;
        await this.authService.update(_user.id, user)
        await this.userRepository.update(_user);
    }

    async delete(id: string): Promise<void> {
        await this.authService.delete(id);
        await this.userRepository.delete(id);
    }

}
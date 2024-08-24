import UserRepository from '../../src/repositories/UserRepository';
import User from '../../src/db/models/user';
import bcrypt from 'bcryptjs';

// Mocking dependencies
jest.mock('../../src/db/models/user');
jest.mock('bcryptjs');

describe('UserRepository', () => {
    let userRepository: UserRepository;

    beforeEach(() => {
        jest.clearAllMocks(); // Clear mocks before each test
        userRepository = new UserRepository();
    });

    describe('create', () => {
        it('should hash the password and create a user', async () => {
            const mockUser = { id: '1', name: 'Test User', email: 'test@example.com', pw: 'hashedpassword' };
            (bcrypt.hash as jest.Mock).mockResolvedValue('hashedpassword');
            (User.create as jest.Mock).mockResolvedValue(mockUser);

            const user = await userRepository.create({ name: 'Test User', email: 'test@example.com', pw: 'password123' });

            expect(bcrypt.hash).toHaveBeenCalledWith('password123', 12);
            expect(User.create).toHaveBeenCalledWith({ name: 'Test User', email: 'test@example.com', pw: 'hashedpassword' });
            expect(user).toEqual(mockUser);
        });
    });

    describe('findByEmail', () => {
        it('should return a user by email', async () => {
            const mockUser = { id: '1', name: 'Test User', email: 'test@example.com', pw: 'hashedpassword' };
            (User.findOne as jest.Mock).mockResolvedValue(mockUser);

            const user = await userRepository.findByEmail('test@example.com');

            expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
            expect(user).toEqual(mockUser);
        });

        it('should return null if no user is found', async () => {
            (User.findOne as jest.Mock).mockResolvedValue(null);

            const user = await userRepository.findByEmail('nonexistent@example.com');

            expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'nonexistent@example.com' } });
            expect(user).toBeNull();
        });
    });

    describe('getByRole', () => {
        it('should return users by role', async () => {
            const mockUsers = [{ id: '1', name: 'Admin User', role: 'admin' }];
            (User.findAll as jest.Mock).mockResolvedValue(mockUsers);

            const users = await userRepository.getByRole('admin');

            expect(User.findAll).toHaveBeenCalledWith({ where: { role: 'admin' } });
            expect(users).toEqual(mockUsers);
        });
    });

    describe('getAll', () => {
        it('should return all users', async () => {
            const mockUsers = [{ id: '1', name: 'Test User' }];
            (User.findAll as jest.Mock).mockResolvedValue(mockUsers);

            const users = await userRepository.getAll();

            expect(User.findAll).toHaveBeenCalledWith({ order: [['created_at', 'DESC']] });
            expect(users).toEqual(mockUsers);
        });
    });

    describe('getById', () => {
        it('should return a user by id', async () => {
            const mockUser = { id: '1', name: 'Test User' };
            (User.findByPk as jest.Mock).mockResolvedValue(mockUser);

            const user = await userRepository.getById('1');

            expect(User.findByPk).toHaveBeenCalledWith('1', {});
            expect(user).toEqual(mockUser);
        });
    });
});

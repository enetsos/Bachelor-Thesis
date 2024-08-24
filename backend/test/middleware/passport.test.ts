import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { initializePassport, authenticateJwt } from '../../src/middleware/passport';
import User from '../../src/db/models/user'; // Adjust the path as necessary

jest.mock('passport', () => ({
    initialize: jest.fn(),
    authenticate: jest.fn(),
    use: jest.fn(),
}));

jest.mock('../../src/db/models/user'); // Mock the User model

describe('passport middleware', () => {
    describe('initializePassport', () => {
        it('should call passport.initialize', () => {
            initializePassport();
            expect(passport.initialize).toHaveBeenCalled();
        });
    });

    describe('authenticateJwt', () => {
        const mockRequest = {} as Request;
        const mockResponse = {} as Response;
        const mockNext = jest.fn() as NextFunction;

        beforeEach(() => {
            jest.clearAllMocks();
            mockResponse.status = jest.fn().mockReturnValue(mockResponse);
            mockResponse.json = jest.fn().mockReturnValue(mockResponse);
        });

        it('should authenticate user with valid JWT token', () => {
            const mockUser = { id: '1234', email: 'test@example.com' };

            (passport.authenticate as jest.Mock).mockImplementation((strategy, options, callback) => {
                return (req: Request, res: Response, next: NextFunction) => {
                    callback(null, mockUser);
                };
            });

            authenticateJwt(mockRequest, mockResponse, mockNext);

            expect(mockNext).toHaveBeenCalled();
            expect(mockResponse.status).not.toHaveBeenCalled();
            expect(mockRequest.user).toEqual(mockUser);
        });

        it('should return 401 if user is not found', () => {
            (passport.authenticate as jest.Mock).mockImplementation((strategy, options, callback) => {
                return (req: Request, res: Response, next: NextFunction) => {
                    callback(null, false);
                };
            });

            authenticateJwt(mockRequest, mockResponse, mockNext);

            expect(mockResponse.status).toHaveBeenCalledWith(401);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Unauthorized User' });
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('should return 401 if there is an error during authentication', () => {
            (passport.authenticate as jest.Mock).mockImplementation((strategy, options, callback) => {
                return (req: Request, res: Response, next: NextFunction) => {
                    callback(new Error('Authentication Error'), null);
                };
            });

            authenticateJwt(mockRequest, mockResponse, mockNext);

            expect(mockResponse.status).toHaveBeenCalledWith(401);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Unauthorized' });
            expect(mockNext).not.toHaveBeenCalled();
        });
    });
});

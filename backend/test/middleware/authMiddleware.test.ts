import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { generateToken, verifyToken, authenticateToken } from '../../src/middleware/authMiddleware';

jest.mock('jsonwebtoken');

describe('authMiddleware', () => {
    const mockRequest = {} as Request;
    const mockResponse = {} as Response;
    const mockNext = jest.fn() as NextFunction;

    beforeEach(() => {
        jest.clearAllMocks();
        mockResponse.status = jest.fn().mockReturnValue(mockResponse);
        mockResponse.json = jest.fn().mockReturnValue(mockResponse);
        mockResponse.sendStatus = jest.fn().mockReturnValue(mockResponse);
    });

    describe('generateToken', () => {
        it('should generate a JWT token with the correct payload', () => {
            const mockPayload = { userId: '1234', role: 'user' };
            const mockToken = 'mockJwtToken';
            (jwt.sign as jest.Mock).mockReturnValue(mockToken);

            const token = generateToken(mockPayload);

            expect(jwt.sign).toHaveBeenCalledWith(mockPayload, expect.any(String), { expiresIn: '1h' });
            expect(token).toBe(mockToken);
        });
    });

    describe('verifyToken', () => {
        it('should call next if token is valid and user has required role', () => {
            const mockUser = { userId: '1234', role: 'admin' };
            mockRequest.cookies = { token: 'validToken' };
            (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
                callback(null, mockUser);
            });

            const middleware = verifyToken('admin');
            middleware(mockRequest, mockResponse, mockNext);

            expect(mockNext).toHaveBeenCalled();
            expect(mockResponse.status).not.toHaveBeenCalled();
        });

        it('should return 401 if token is missing', () => {
            mockRequest.cookies = {};

            const middleware = verifyToken('admin');
            middleware(mockRequest, mockResponse, mockNext);

            expect(mockResponse.status).toHaveBeenCalledWith(401);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'No token provided' });
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('should return 401 if token is invalid', () => {
            mockRequest.cookies = { token: 'invalidToken' };
            (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
                callback(new Error('Invalid token'), null);
            });

            const middleware = verifyToken('admin');
            middleware(mockRequest, mockResponse, mockNext);

            expect(mockResponse.status).toHaveBeenCalledWith(401);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Invalid token' });
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('should return 403 if user role does not match', () => {
            const mockUser = { userId: '1234', role: 'user' };
            mockRequest.cookies = { token: 'validToken' };
            (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
                callback(null, mockUser);
            });

            const middleware = verifyToken('admin');
            middleware(mockRequest, mockResponse, mockNext);

            expect(mockResponse.status).toHaveBeenCalledWith(403);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'You do not have the authorization and permissions to access this resource.',
            });
            expect(mockNext).not.toHaveBeenCalled();
        });
    });

    describe('authenticateToken', () => {
        it('should call next if token is valid', () => {
            const mockUser = { userId: '1234' };
            mockRequest.cookies = { token: 'validToken' };
            (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
                callback(null, mockUser);
            });

            authenticateToken(mockRequest, mockResponse, mockNext);

            expect(mockNext).toHaveBeenCalled();
            expect(mockResponse.sendStatus).not.toHaveBeenCalled();
        });

        it('should return 401 if token is missing', () => {
            mockRequest.cookies = {};

            authenticateToken(mockRequest, mockResponse, mockNext);

            expect(mockResponse.sendStatus).toHaveBeenCalledWith(401);
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('should return 403 if token is invalid', () => {
            mockRequest.cookies = { token: 'invalidToken' };
            (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
                callback(new Error('Invalid token'), null);
            });

            authenticateToken(mockRequest, mockResponse, mockNext);

            expect(mockResponse.sendStatus).toHaveBeenCalledWith(403);
            expect(mockNext).not.toHaveBeenCalled();
        });
    });
});

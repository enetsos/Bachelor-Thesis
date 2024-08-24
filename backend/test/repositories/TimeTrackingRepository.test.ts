import TimeTrackingRepository from '../../src/repositories/TimeTrackingRepository';
import TimeTracking from '../../src/db/models/timeTracking';
import User from '../../src/db/models/user';
import Supply from '../../src/db/models/supply';
import { calculateDistance } from '../../src/utils/distanceCalculator';
import DistanceError from '../../src/errors/TimeTrackingErrors';

// Mocking dependencies
jest.mock('../../src/db/models/timeTracking');
jest.mock('../../src/db/models/user');
jest.mock('../../src/db/models/supply');
jest.mock('../../src/utils/distanceCalculator');

describe('TimeTrackingRepository', () => {
    let timeTrackingRepository: TimeTrackingRepository;

    beforeEach(() => {
        jest.clearAllMocks(); // Clear mocks before each test
        timeTrackingRepository = new TimeTrackingRepository();
    });

    describe('create', () => {
        it('should create a new time tracking entry if within distance', async () => {
            const mockUser = { id: 'client-1', clientLAT: 40.7128, clientLONG: -74.0060 };
            const mockTimeTracking = { id: 'tt-1', status: 'active' };
            (User.findByPk as jest.Mock).mockResolvedValue(mockUser);
            (calculateDistance as jest.Mock).mockReturnValue(100); // within 500 meters
            (TimeTracking.create as jest.Mock).mockResolvedValue(mockTimeTracking);

            const data = { employeeId: 'emp-1', clientId: 'client-1', latStartTime: 40.7128, longStartTime: -74.0060 };

            const result = await timeTrackingRepository.create(data);

            expect(User.findByPk).toHaveBeenCalledWith('client-1');
            expect(calculateDistance).toHaveBeenCalledWith(40.7128, -74.0060, 40.7128, -74.0060);
            expect(TimeTracking.create).toHaveBeenCalledWith(expect.objectContaining({ status: 'active' }));
            expect(result).toEqual(mockTimeTracking);
        });

        it('should throw DistanceError if the start location is too far from the client', async () => {
            const mockUser = { id: 'client-1', clientLAT: 40.7128, clientLONG: -74.0060 };
            (User.findByPk as jest.Mock).mockResolvedValue(mockUser);
            (calculateDistance as jest.Mock).mockReturnValue(1000); // beyond 500 meters

            const data = { employeeId: 'emp-1', clientId: 'client-1', latStartTime: 40.7128, longStartTime: -74.0060 };

            await expect(timeTrackingRepository.create(data)).rejects.toThrow(DistanceError);
            expect(calculateDistance).toHaveBeenCalled();
        });

        it('should conclude existing active time tracking before creating a new one', async () => {
            const mockUser = { id: 'client-1', clientLAT: 40.7128, clientLONG: -74.0060 };
            const mockActiveTracking = { id: 'tt-1', status: 'active', update: jest.fn() };
            const mockNewTimeTracking = { id: 'tt-2', status: 'active' };
            (User.findByPk as jest.Mock).mockResolvedValue(mockUser);
            (TimeTracking.findOne as jest.Mock).mockResolvedValue(mockActiveTracking);
            (calculateDistance as jest.Mock).mockReturnValue(100); // within 500 meters
            (TimeTracking.create as jest.Mock).mockResolvedValue(mockNewTimeTracking);

            const data = { employeeId: 'emp-1', clientId: 'client-1', latStartTime: 40.7128, longStartTime: -74.0060 };

            const result = await timeTrackingRepository.create(data);

            expect(TimeTracking.create).toHaveBeenCalledWith(expect.objectContaining({ status: 'active' }));
            expect(result).toEqual(mockNewTimeTracking);
        });
    });

    describe('getAll', () => {
        it('should return all time tracking entries with associated user and supply data', async () => {
            const mockTimeTrackings = [{ id: 'tt-1', employeeId: 'emp-1', clientId: 'client-1' }];
            (TimeTracking.findAll as jest.Mock).mockResolvedValue(mockTimeTrackings);

            const results = await timeTrackingRepository.getAll();

            expect(TimeTracking.findAll).toHaveBeenCalledWith({
                include: [
                    { model: User, as: 'employee' },
                    { model: User, as: 'client' },
                    { model: Supply }
                ],
                order: [['created_at', 'DESC']],
            });
            expect(results).toEqual(mockTimeTrackings);
        });
    });

    describe('getById', () => {
        it('should return the time tracking entry with associated user and supply data', async () => {
            const mockTimeTracking = { id: 'tt-1', employeeId: 'emp-1', clientId: 'client-1' };
            (TimeTracking.findByPk as jest.Mock).mockResolvedValue(mockTimeTracking);

            const result = await timeTrackingRepository.getById('tt-1');

            expect(TimeTracking.findByPk).toHaveBeenCalledWith('tt-1', {
                include: [
                    { model: User, as: 'employee' },
                    { model: User, as: 'client' },
                    { model: Supply }
                ],
            });
            expect(result).toEqual(mockTimeTracking);
        });
    });

    describe('findByClientId', () => {
        it('should return time tracking entries by clientId', async () => {
            const mockTimeTrackings = [{ id: 'tt-1', clientId: 'client-1' }];
            (TimeTracking.findAll as jest.Mock).mockResolvedValue(mockTimeTrackings);

            const results = await timeTrackingRepository.findByClientId('client-1');

            expect(TimeTracking.findAll).toHaveBeenCalledWith({
                where: { clientId: 'client-1' },
                include: [
                    { model: User, as: 'employee' },
                    { model: User, as: 'client' },
                    { model: Supply }
                ],
            });
            expect(results).toEqual(mockTimeTrackings);
        });
    });

    describe('findByEmployeeId', () => {
        it('should return time tracking entries by employeeId', async () => {
            const mockTimeTrackings = [{ id: 'tt-1', employeeId: 'emp-1' }];
            (TimeTracking.findAll as jest.Mock).mockResolvedValue(mockTimeTrackings);

            const results = await timeTrackingRepository.findByEmployeeId('emp-1');

            expect(TimeTracking.findAll).toHaveBeenCalledWith({
                where: { employeeId: 'emp-1' },
                include: [
                    { model: User, as: 'employee' },
                    { model: User, as: 'client' },
                    { model: Supply }
                ],
            });
            expect(results).toEqual(mockTimeTrackings);
        });
    });

    describe('stopTimer', () => {
        it('should update the time tracking entry to mark it as completed', async () => {
            const mockTimeTracking = {
                id: 'tt-1',
                employeeId: 'emp-1',
                clientId: 'client-1',
                status: 'active',
                save: jest.fn(),
            };
            (TimeTracking.findByPk as jest.Mock).mockResolvedValue(mockTimeTracking);

            const result = await timeTrackingRepository.stopTimer('tt-1', { endTime: new Date() });

            expect(TimeTracking.findByPk).toHaveBeenCalledWith('tt-1', {
                include: [
                    { model: User, as: 'employee' },
                    { model: User, as: 'client' },
                    { model: Supply }
                ],
            });
            expect(mockTimeTracking.save).toHaveBeenCalled();
            expect(result).toEqual(mockTimeTracking);
        });

        it('should throw an error if time tracking entry is not found', async () => {
            (TimeTracking.findByPk as jest.Mock).mockResolvedValue(null);

            await expect(timeTrackingRepository.stopTimer('tt-1', { endTime: new Date() })).rejects.toThrow(Error);
            expect(TimeTracking.findByPk).toHaveBeenCalled();
        });
    });
});

import TimeTrackingSupplyRepository from '../../src/repositories/TimeTrackingSupplyRepository';
import TimeTrackingSupply from '../../src/db/models/timeTrackingSupply';

// Mocking dependencies
jest.mock('../../src/db/models/timeTrackingSupply');

describe('TimeTrackingSupplyRepository', () => {
    let timeTrackingSupplyRepository: TimeTrackingSupplyRepository;

    beforeEach(() => {
        jest.clearAllMocks(); // Clear mocks before each test
        timeTrackingSupplyRepository = new TimeTrackingSupplyRepository();
    });

    describe('getAll', () => {
        it('should return all time tracking supplies with default options', async () => {
            const mockTimeTrackingSupplies = [{ id: '1', timeTrackingId: 'tt1', supplyId: 's1' }];
            (TimeTrackingSupply.findAll as jest.Mock).mockResolvedValue(mockTimeTrackingSupplies);

            const supplies = await timeTrackingSupplyRepository.getAll();


            expect(supplies).toEqual(mockTimeTrackingSupplies);
        });
    });

    describe('findByTimeTrackingId', () => {
        it('should return supplies by timeTrackingId', async () => {
            const mockTimeTrackingSupplies = [{ id: '1', timeTrackingId: 'tt1', supplyId: 's1' }];
            (TimeTrackingSupply.findAll as jest.Mock).mockResolvedValue(mockTimeTrackingSupplies);

            const supplies = await timeTrackingSupplyRepository.findByTimeTrackingId('tt1');

            expect(TimeTrackingSupply.findAll).toHaveBeenCalledWith({
                where: { timeTrackingId: 'tt1' },
            });
            expect(supplies).toEqual(mockTimeTrackingSupplies);
        });
    });

    describe('findBySupplyId', () => {
        it('should return time tracking supplies by supplyId', async () => {
            const mockTimeTrackingSupplies = [{ id: '1', timeTrackingId: 'tt1', supplyId: 's1' }];
            (TimeTrackingSupply.findAll as jest.Mock).mockResolvedValue(mockTimeTrackingSupplies);

            const supplies = await timeTrackingSupplyRepository.findBySupplyId('s1');

            expect(TimeTrackingSupply.findAll).toHaveBeenCalledWith({
                where: { supplyId: 's1' },
            });
            expect(supplies).toEqual(mockTimeTrackingSupplies);
        });
    });
});

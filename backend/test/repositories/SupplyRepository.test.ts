import SupplyRepository from '../../src/repositories/SupplyRepository';
import Supply from '../../src/db/models/supply';

// Mocking the Supply model
jest.mock('../../src/db/models/supply');

describe('SupplyRepository', () => {
    let supplyRepository: SupplyRepository;

    beforeEach(() => {
        jest.clearAllMocks(); // Clear mocks before each test
        supplyRepository = new SupplyRepository();
    });

    describe('Constructor', () => {
        it('should initialize with the Supply model', () => {
            expect(supplyRepository['modelClass']).toBe(Supply);
        });
    });

    describe('Basic CRUD operations', () => {
        it('should create a new supply', async () => {
            const mockSupply = { id: '1', name: 'Test Supply' };
            (Supply.create as jest.Mock).mockResolvedValue(mockSupply);

            const result = await supplyRepository.create({ name: 'Test Supply' });

            expect(Supply.create).toHaveBeenCalledWith({ name: 'Test Supply' });
            expect(result).toEqual(mockSupply);
        });

        it('should retrieve a supply by ID', async () => {
            const mockSupply = { id: '1', name: 'Test Supply' };
            (Supply.findByPk as jest.Mock).mockResolvedValue(mockSupply);

            const result = await supplyRepository.getById('1');

            expect(Supply.findByPk).toHaveBeenCalledWith('1', {});
            expect(result).toEqual(mockSupply);
        });

        it('should retrieve all supplies', async () => {
            const mockSupplies = [{ id: '1', name: 'Test Supply' }];
            (Supply.findAll as jest.Mock).mockResolvedValue(mockSupplies);

            const result = await supplyRepository.getAll();

            expect(Supply.findAll).toHaveBeenCalledWith({
                order: [['created_at', 'DESC']],
            });
            expect(result).toEqual(mockSupplies);
        });

        it('should update a supply', async () => {
            const mockSupply = { id: '1', name: 'Updated Supply' };
            const mockInstance = {
                update: jest.fn().mockResolvedValue(mockSupply),
            };
            (Supply.findByPk as jest.Mock).mockResolvedValue(mockInstance);

            const result = await supplyRepository.update('1', { name: 'Updated Supply' });

            expect(Supply.findByPk).toHaveBeenCalledWith('1');
            expect(mockInstance.update).toHaveBeenCalledWith({ name: 'Updated Supply' });
            expect(result).toEqual(mockSupply);
        });

        it('should delete a supply', async () => {
            const mockSupply = { id: '1', name: 'Test Supply', destroy: jest.fn().mockResolvedValue(true) };
            (Supply.findByPk as jest.Mock).mockResolvedValue(mockSupply);

            const result = await supplyRepository.delete('1');

            expect(Supply.findByPk).toHaveBeenCalledWith('1');
            expect(mockSupply.destroy).toHaveBeenCalled();
            expect(result).toBe(true);
        });

        it('should throw an error when trying to delete a non-existing supply', async () => {
            (Supply.findByPk as jest.Mock).mockResolvedValue(null);

            await expect(supplyRepository.delete('1')).rejects.toThrowError();

            expect(Supply.findByPk).toHaveBeenCalledWith('1');
        });
    });
});

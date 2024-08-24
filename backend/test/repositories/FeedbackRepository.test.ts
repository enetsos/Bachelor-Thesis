import FeedbackRepository from '../../src/repositories/FeedbackRepository';
import Feedback from '../../src/db/models/feedback';
import User from '../../src/db/models/user';

// Mocking dependencies
jest.mock('../../src/db/models/feedback');
jest.mock('../../src/db/models/user');

describe('FeedbackRepository', () => {
    let feedbackRepository: FeedbackRepository;

    beforeEach(() => {
        jest.clearAllMocks(); // Clear mocks before each test
        feedbackRepository = new FeedbackRepository();
    });

    describe('Constructor', () => {
        it('should initialize with the Feedback model', () => {
            expect(feedbackRepository['modelClass']).toBe(Feedback);
        });
    });

    describe('getAll', () => {
        it('should return all feedbacks with associated user data', async () => {
            const mockFeedbacks = [{ id: '1', clientId: 'client-1', notes: 'Great service!' }];
            (Feedback.findAll as jest.Mock).mockResolvedValue(mockFeedbacks);

            const results = await feedbackRepository.getAll();

            expect(Feedback.findAll).toHaveBeenCalledWith({
                include: [{ model: User }],
                order: [['created_at', 'DESC']],
            });
            expect(results).toEqual(mockFeedbacks);
        });
    });

    describe('getByClientId', () => {
        it('should return feedbacks by clientId with associated user data', async () => {
            const mockFeedbacks = [{ id: '1', clientId: 'client-1', notes: 'Great service!' }];
            (Feedback.findAll as jest.Mock).mockResolvedValue(mockFeedbacks);

            const results = await feedbackRepository.getByClientId('client-1');

            expect(Feedback.findAll).toHaveBeenCalledWith({
                where: { clientId: 'client-1' },
                include: [{ model: User }],
            });
            expect(results).toEqual(mockFeedbacks);
        });
    });
});

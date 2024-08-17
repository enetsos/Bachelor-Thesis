import ApiError from './ApiError';
import BaseError from './BaseError';

type ErrorCode = 'NOT_FOUND' | 'INVALID_INPUT' | 'DISTANCE_ERROR' | 'TIME_TRACKING_ERROR';

type ErrorName = 'ERR_NF' | 'ERR_VALID' | 'DISTANCE_ERROR' | 'TIME_TRACKING_ERROR';

class DistanceError extends BaseError<ErrorName, ErrorCode> {
    constructor(message: string) {
        super({
            name: 'DISTANCE_ERROR',
            message: message || 'Distance validation failed',
            status: 406,
            code: 'DISTANCE_ERROR'
        });
    }
}
export default DistanceError;
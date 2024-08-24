import { calculateDistance } from '../../src/utils/distanceCalculator';

describe('calculateDistance', () => {
    it('should return correct distance between two points', () => {
        // Test between two known points (e.g., New York City and London)
        const lat1 = 40.7128; // NYC Latitude
        const lon1 = -74.0060; // NYC Longitude
        const lat2 = 51.5074; // London Latitude
        const lon2 = -0.1278; // London Longitude

        const distance = calculateDistance(lat1, lon1, lat2, lon2);
        expect(distance).toBeCloseTo(5570226, -2); // Expect distance in meters (approximately 5570 km)
    });

    it('should return 0 if the points are the same', () => {
        const lat = 40.7128;
        const lon = -74.0060;

        const distance = calculateDistance(lat, lon, lat, lon);
        expect(distance).toBe(0);
    });

    it('should return correct distance between two nearby points', () => {
        // Test between two close points (e.g., a small distance in the same city)
        const lat1 = 40.7128;
        const lon1 = -74.0060;
        const lat2 = 40.7129;
        const lon2 = -74.0059;

        const distance = calculateDistance(lat1, lon1, lat2, lon2);
        expect(distance).toBeCloseTo(14, -1); // Expect distance in meters (approximately 14 meters)
    });

});

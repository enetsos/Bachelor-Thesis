import React from 'react';
import { TimeTrackingAttributes } from '../types';

interface ServiceInfoProps {
    timeTracking: TimeTrackingAttributes;
}

const ServiceInfo: React.FC<ServiceInfoProps> = ({ timeTracking }) => {
    return (
        <div>
            <p><strong>Start Time:</strong> {new Date(timeTracking.startTime!).toLocaleString()}</p>
            <p><strong>Status:</strong> {timeTracking.status}</p>
            {timeTracking.endTime && (
                <p><strong>End Time:</strong> {new Date(timeTracking.endTime).toLocaleString()}</p>
            )}
            <p><strong>Notes:</strong> {timeTracking.notes}</p>
        </div>
    );
};

export default ServiceInfo;

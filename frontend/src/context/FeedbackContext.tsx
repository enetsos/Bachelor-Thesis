import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import FeedbackService from '../services/FeedbackService';
import { FeedbackAttributes } from '../types';

interface FeedbackContextProps {
    feedbacks: FeedbackAttributes[];
    fetchFeedbacks: () => Promise<void>;
    getFeedbackByClientId: (clientId: string) => Promise<FeedbackAttributes[]>;
    createFeedback: (data: Partial<FeedbackAttributes>) => Promise<void>;
    loading: boolean;
}

const FeedbackContext = createContext<FeedbackContextProps | undefined>(undefined);

export const useFeedback = (): FeedbackContextProps => {
    const context = useContext(FeedbackContext);
    if (!context) {
        throw new Error('useFeedback must be used within a FeedbackProvider');
    }
    return context;
};

export const FeedbackProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [feedbacks, setFeedbacks] = useState<FeedbackAttributes[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchFeedbacks = async () => {
        setLoading(true);
        try {
            const feedbacksData = await FeedbackService.getAllFeedbacks();
            setFeedbacks(feedbacksData);
        } catch (error) {
            console.error('Error fetching feedbacks:', error);
        } finally {
            setLoading(false);
        }
    };

    const getFeedbackByClientId = async (clientId: string): Promise<FeedbackAttributes[]> => {
        setLoading(true);
        try {
            const feedbackData = await FeedbackService.getFeedbackByClientId(clientId);
            setFeedbacks(feedbackData);
            return feedbackData;
        } catch (error) {
            console.error('Error fetching feedback by client id:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const createFeedback = async (data: Partial<FeedbackAttributes>) => {
        setLoading(true);
        try {
            await FeedbackService.createFeedback(data);
        } catch (error) {
            console.error('Error creating feedback:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    return (
        <FeedbackContext.Provider value={{ feedbacks, fetchFeedbacks, getFeedbackByClientId, createFeedback, loading }}>
            {children}
        </FeedbackContext.Provider>
    );
};
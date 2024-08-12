import React from 'react';
import { User } from '../types';

interface ClientInfoProps {
    client: User | null;
}

const ClientInfo: React.FC<ClientInfoProps> = ({ client }) => {
    return (
        <div>
            <p><strong>Nome:</strong> {client?.name}</p>
            <p><strong>Email:</strong> {client?.email}</p>
        </div>
    );
};

export default ClientInfo;

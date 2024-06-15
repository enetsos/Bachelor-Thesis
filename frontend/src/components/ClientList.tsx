// src/components/ClientList.tsx

import React, { useState, useEffect } from 'react';
import ClientController from '../controllers/ClientController';

const ClientList: React.FC = () => {
    const [clients, setClients] = useState<Client[]>([]);

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        try {
            const clientsData = await ClientController.getAllClients();
            setClients(clientsData);
        } catch (error) {
            console.error('Error fetching clients:', error);
        }
    };

    return (
        <div>
            <h1>List of Clients</h1>
            <ul>
                {clients.map(client => (
                    <li key={client.id}>
                        <strong>Name:</strong> {client.name}, <strong>Email:</strong> {client.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ClientList;

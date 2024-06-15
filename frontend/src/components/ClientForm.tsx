// src/components/ClientForm.tsx
import React, { useState } from 'react';
import ClientController from '../controllers/ClientController';

const ClientForm: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const newClient = await ClientController.createClient({ name, email });
            console.log('Created client:', newClient);
            // Optionally reset form state or perform other actions after successful creation
        } catch (error) {
            console.error('Error creating client:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <br />
            <label>
                Email:
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <br />
            <button type="submit">Create Client</button>
        </form>
    );
};

export default ClientForm;

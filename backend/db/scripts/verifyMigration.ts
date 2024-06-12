import { Sequelize } from 'sequelize';

// Configura il database Sequelize
const sequelize = new Sequelize('mydatabase', 'user', 'admin', {
    host: 'localhost',
    dialect: 'mysql',
});

const verifyTables = async () => {
    try {
        // Autenticazione
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        // Verifica se le tabelle esistono
        const tables = await sequelize.getQueryInterface().showAllTables();
        console.log('Tables in the database:', tables);

        // Descrivi una tabella
        const userProfileDescription = await sequelize.getQueryInterface().describeTable('UserProfiles');
        console.log('UserProfiles Table Structure:', userProfileDescription);

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    } finally {
        await sequelize.close();
    }
};

verifyTables();

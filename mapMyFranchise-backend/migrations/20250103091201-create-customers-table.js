'use strict';

module.exports = {
  up: async ({ context: queryInterface }) => {
    const createTableQuery = `
    CREATE TABLE Customers (
        customerId VARCHAR(255) PRIMARY KEY,
        fullName VARCHAR(255),
        email VARCHAR(255) UNIQUE,
        nickName VARCHAR(255),
        phone VARCHAR(255),
        shippingAddress TEXT,
        createdAt TIMESTAMP,
        updatedAt TIMESTAMP
    );
    `;
    await queryInterface.sequelize.query(createTableQuery);
  },
};

'use strict';

module.exports = {
  up: async ({ context: queryInterface }) => {
    const createTableQuery = `
    CREATE TABLE Sales (
        saleId VARCHAR(255) PRIMARY KEY,
        orderId VARCHAR(255),
        nickName VARCHAR(255),
        saleAmount FLOAT,
        saleDate TIMESTAMP,
        customerId VARCHAR(255),
        createdAt TIMESTAMP,
        updatedAt TIMESTAMP
    );
    `;
    await queryInterface.sequelize.query(createTableQuery);
  },
};

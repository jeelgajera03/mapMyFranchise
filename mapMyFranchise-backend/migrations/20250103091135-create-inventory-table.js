'use strict';

module.exports = {
  up: async ({ context: queryInterface }) => {
    const createTableQuery = `
    CREATE TABLE Inventory (
        inventoryId VARCHAR(255) PRIMARY KEY,
        productId VARCHAR(255),
        quantity INT,
        location VARCHAR(255),
        createdAt TIMESTAMP,
        updatedAt TIMESTAMP
    );
    `;
    await queryInterface.sequelize.query(createTableQuery);
  },
};

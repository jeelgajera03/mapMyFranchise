'use strict';

module.exports = {
  up: async ({ context: queryInterface }) => {
    const createTableQuery = `
    CREATE TABLE Products (
        productId VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255),
        description TEXT,
        price FLOAT,
        categoryId VARCHAR(255),
        stockQuantity INT,
        createdAt TIMESTAMP,
        updatedAt TIMESTAMP
    );
    `;
    await queryInterface.sequelize.query(createTableQuery);
  },
};

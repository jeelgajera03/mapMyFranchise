'use strict';

module.exports = {
  up: async ({ context: queryInterface }) => {
    const createTableQuery = `
    CREATE TABLE Orders (
        orderId VARCHAR(255) PRIMARY KEY,
        userId VARCHAR(255),
        orderDate TIMESTAMP,
        status VARCHAR(255),
        totalAmount FLOAT,
        shippingAddress TEXT,
        paymentStatus VARCHAR(255),
        createdAt TIMESTAMP,
        updatedAt TIMESTAMP
    );
    `;
    await queryInterface.sequelize.query(createTableQuery);
  },
};

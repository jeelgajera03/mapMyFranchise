'use strict';

module.exports = {
  up: async ({ context: queryInterface }) => {
    const dropTableQuery = `DROP TABLE IF EXISTS Sales;`;
    await queryInterface.sequelize.query(dropTableQuery);
  }
};

const { Sequelize } = require('sequelize');
const { Umzug, SequelizeStorage } = require('umzug');
 
const sequelize = new Sequelize({
    host: '127.0.0.1',
    port: 3306,
    database: "khodal_LED",
    username: "jil.gajera",
    password: "Rapid@123456",
    dialect: "mysql",
});
 
const umzug = new Umzug({
    migrations: { glob: "./migrations/*.js" },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
});
 
umzug.up();

// command: npx sequelize-cli migration:generate --name create-sales-table
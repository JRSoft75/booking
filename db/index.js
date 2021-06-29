'use strict'
const config = require('./config.js')
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(config.db, config.user, config.password, {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    operatorsAliases: 0,
    pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle,
    },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.model = {
    user: require('./model/user.model')(sequelize, DataTypes),
    room: require('./model/room.model')(sequelize, DataTypes),
    booking: require('./model/booking.model')(sequelize, DataTypes),


};
module.exports = db
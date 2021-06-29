'use strict'
module.exports = (Sequelize, DataTypes) => {
    return Sequelize.define('room', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        floor: {
            type: DataTypes.INTEGER
        },
        price: {
            type: DataTypes.DECIMAL(10, 2)
        },
        rooms: {
            type: DataTypes.INTEGER,
        },
    }, {
        tableName: 'room',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
};
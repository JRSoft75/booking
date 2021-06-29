'use strict'
module.exports = (Sequelize, DataTypes) => {
    return Sequelize.define('booking', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        room_id: {
            type: DataTypes.INTEGER,
        },
        user_id: {
            type: DataTypes.INTEGER,
        },
        date_begin: {
            type: DataTypes.DATE,
        },
        date_end: {
            type: DataTypes.DATE,
        },
        human_count: {
            type: DataTypes.INTEGER
        },
    }, {
        tableName: 'booking',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
};
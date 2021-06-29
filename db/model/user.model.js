'use strict'
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = (Sequelize, DataTypes) => {
    return Sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
                notEmpty: true
            }
        },
        phone: {
            type: DataTypes.STRING
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        passport: {
            type: DataTypes.STRING
        },
        hashcode: {
            type: DataTypes.STRING,
            allowNull: false
        },
        active: {
            type: DataTypes.BOOLEAN,
            default: true
        },
        jwt: {
            type: DataTypes.VIRTUAL,
            get() {
                if(this.id === null) return null;
                const today = new Date();
                const expirationDate = new Date(today);
                expirationDate.setDate(today.getDate() + 60);
                return jwt.sign({
                    email: this.email,
                    id: this.id,
                    exp: parseInt(expirationDate.getTime() / 1000, 10),
                }, process.env.JWT_SECRET);
            },
        },
        password: {
            type: DataTypes.VIRTUAL,
            get() {
            },
            set(value) {
                this.setDataValue('hashcode', bcrypt.hashSync(value, parseInt(process.env.JWT_SALT_ROUNDS)));
            }
        },
    }, {
        tableName: 'user',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
};
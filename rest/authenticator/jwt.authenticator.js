'use strict'
const jwt = require('./jwt');
const constants = require('../../lib/constants');
const userController = require('../../db/controller/user.controller');

module.exports = async function jwtAuthenticator(pluginContext, info) {
    const payload = await jwt.getPayload(pluginContext.req.headers.authorization);
    if(!payload){
        return {type: 'invalid', statusCode: 401, message: constants.INCORRECT_TOKEN};
    }

    const user = await userController.findUserByIdAndEmail(payload.id, payload.email);
    if (!user) {
        return {type: 'invalid', statusCode: 401, message: constants.INCORRECT_TOKEN};
    }

    return {
        type: 'success',
        user: user,
        roles: ['read', 'write'],
        scopes: []
    };
};

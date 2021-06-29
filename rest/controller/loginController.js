const bcrypt = require('bcrypt');
const response = require('../response');
const converters = require('../../lib/converters');
const validator = require('validator');
const userController = require('../../db/controller/user.controller');

exports.login = async function login(context) {
    const email = (context.requestBody.email) ? context.requestBody.email.trim().toLowerCase() : '';
    const password = (context.requestBody.password) ? context.requestBody.password.trim() : '';
    if(validator.isEmpty(password))
        return response.errorResponse("Password is empty.");
    if(!email || validator.isEmpty(email) || !validator.isEmail(email))
        return response.errorResponse("Incorrect email.");

    const user = await userController.findActiveUserByEmail(email);
    if (!user) {
        return response.errorResponse("User not found.");
    }

    const match = await bcrypt.compare(password, user.hashcode);
    if(match) {
        log.debug('[login] result: ' + JSON.stringify(user, null, 4));
        const fields = [
            'jwt',
            'first_name',
            'last_name'
        ]
        return response.successResponse(converters.getPermittedFields(user, fields));
    }else{
        log.error('[login] Not match');
        return response.errorResponse("Password incorrect.");
    }
};





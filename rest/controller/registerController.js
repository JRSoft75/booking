'use strict';
const userController = require('../../db/controller/user.controller')
const response = require('../response')
const validator = require('validator')
const constants = require('../../lib/constants')


exports.register = async function register(context) {
    const email = (context.requestBody.email) ? context.requestBody.email.trim().toLowerCase() : ''
    const password = (context.requestBody.password) ? context.requestBody.password.trim() : ''
    const firstName = (context.requestBody.firstName) ? context.requestBody.firstName.trim() : ''
    const lastName = (context.requestBody.lastName) ? context.requestBody.lastName.trim() : ''
    const phone = (context.requestBody.phone) ? context.requestBody.phone.trim() : ''
    const passport = (context.requestBody.passport) ? context.requestBody.passport.trim() : ''
    if (validator.isEmpty(password)) {
        return response.errorResponse(constants.REQUIRED_PASSWORD)
    }
    if (!email || validator.isEmpty(email) || !validator.isEmail(email)) {
        return response.errorResponse(constants.INCORRECT_EMAIL)
    }
    try{
        const user = await userController.createUser({
            email: email,
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            passport: passport,
            password: password,
        })
        if (!user) {
            return response.errorResponse(constants.USER_NOT_CREATED)
        }
        const result = await userController.findUserByEmail(email)

        return response.successResponse(result)
    }catch (e) {
        log.error(e.stack)
        if (e.name === 'SequelizeUniqueConstraintError') {
            return response.errorResponse(constants.EXISTS_EMAIL)
        } else {
            return response.errorResponse(e.message)
        }
    }
}


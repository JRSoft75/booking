'use strict'
const db = require('../')
const validator = require('validator')
const bcrypt = require('bcrypt')

const createUser = async (userDTO) => {
    const result = await db.model.user.create({
        email: userDTO.email.toLowerCase(),
        first_name: userDTO.firstName,
        last_name: userDTO.lastName,
        passport: userDTO.passport,
        password: userDTO.password,
        phone: userDTO.phone,
        active: true,
    })
    const user = result.get({plain: true})
    if (user === null) {
        log.error('[createUser] can not create user: ' + JSON.stringify(userDTO, null, 4))
        return false
    }
    return user
}

const readUser = async (userId) => {
    db.model.user.hasMany(db.model.booking)
    const result = await db.model.user.findOne({
        include: [
            {model: db.model.booking},
        ],
        where: {id: userId}
    })
    if (result === null) {
        log.error('[readUser] can not find user: ' + userId)
        return false
    }
    return result.get({plain: true})
}

const findUserByEmail = async (email) => {
    const result = await db.model.user.findOne({
        where: {email: email}
    })
    if (!result) {
        log.error('[findUserByEmail] can not find user: ' + email)
        return false
    }
    return result.get({plain: true})
}

const findUserByIdAndEmail = async (id, email) => {
    const result = await db.model.user.findOne({
        where: {
            id: id,
            email: email
        }
    })
    if (!result) {
        log.error('[findUserByEmail] can not find user: ' + email)
        return false
    }
    return result.get({plain: true})
}

const findActiveUserByEmail = async (email) => {
    const result = await db.model.user.findOne({
        where: {
            email: email,
            active: true
        }
    })
    if (!result) {
        log.error('[findUserByEmail] can not find user: ' + email)
        return false
    }
    return result.get({plain: true})
}


const updateUser = async (userDTO) => {
    let user = await db.model.user.findByPk(userDTO.id)
    if (!user) {
        log.error('[updateUser] user was not found: ' + userDTO.id)
        return false
    }
    user.email = userDTO.email.toLowerCase()
    user.first_name = userDTO.firstName
    user.last_name = userDTO.lastName
    user.passport = userDTO.passport
    user.active = userDTO.active
    user.phone = userDTO.phone
    if (userDTO.password && !validator.isEmpty(userDTO.password)) {
        user.hashcode = bcrypt.hashSync(userDTO.password, parseInt(process.env.JWT_SALT_ROUNDS))
    }
    try {
        return await user.save()
    } catch (e) {
        log.error('[updateUser] error: ' + JSON.stringify(e, null, 4))
        log.error('[updateUser] user not updated: ' + JSON.stringify(user, null, 4))
        return false
    }
}


const deleteUser = async (userId) => {
    let user = await db.model.user.findByPk(userId)
    if (!user) {
        log.error('[deleteUser] user was not found: ' + userId)
        return false
    }
    try {
        user.active = false
        return await user.save()
    } catch (e) {
        log.error(`[deleteUser] error was caught for delete user id: ${userId}`)
        return false
    }
}


exports.createUser = createUser
exports.readUser = readUser
exports.findUserByEmail = findUserByEmail
exports.findActiveUserByEmail = findActiveUserByEmail
exports.findUserByIdAndEmail = findUserByIdAndEmail
exports.updateUser = updateUser
exports.deleteUser = deleteUser


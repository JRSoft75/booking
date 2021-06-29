'use strict'
const db = require('../')


const createBooking = async (bookingDTO) => {
    const result = await db.model.booking.create({
        room_id: bookingDTO.roomId,
        user_id: bookingDTO.userId,
        human_count: bookingDTO.humanCount,
        date_begin: bookingDTO.dateBegin,
        date_end: bookingDTO.dateEnd
    })
    const user = result.get({plain: true})
    if (!user) {
        log.error('[createBooking] can not create user: ' + JSON.stringify(bookingDTO, null, 4))
        return false
    }
    return user
}

const readBooking = async (bookingId) => {
    db.model.booking.hasMany(db.model.booking)
    const result = await db.model.booking.findOne({
        where: {id: bookingId}
    })
    if (result === null) {
        log.error('[readBooking] can not find Booking : ' + bookingId)
        return false
    }
    return result.get({plain: true})
}

const deleteBooking = async (bookingId, userId) => {
    let booking = await db.model.booking.findByPk(bookingId)
    if (!booking) {
        log.error('[deleteBooking] booking was not found: ' + bookingId)
        return false
    }
    try {
        await db.model.booking.destroy({
            where: {
                id: bookingId,
                user_id: userId
            }
        });
    } catch (e) {
        log.error(`[deleteBooking] error was caught for delete booking id: ${bookingId}`)
        return false
    }
}


exports.createBooking = createBooking
exports.readBooking = readBooking
exports.deleteBooking = deleteBooking


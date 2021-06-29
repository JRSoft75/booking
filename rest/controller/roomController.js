'use strict';
const roomController = require('../../db/controller/room.controller');
const bookingController = require('../../db/controller/booking.controller');
const converters = require('../../lib/converters');
const response = require('../response');
const moment = require('moment');
const constants = require('../../lib/constants')


exports.roomList = async (context) => {
    const dateBegin = moment(context.requestBody.dateBegin).format('YYYY-MM-DD')
    const dateEnd = moment(context.requestBody.dateEnd).format('YYYY-MM-DD')
    try {
        const rooms = await roomController.findFreeRooms(dateBegin, dateEnd)
        const fields = [
            'id',
            'floor',
            'rooms',
            'price'
        ]
        return response.successResponse(rooms.map(room=>converters.getPermittedFields(room, fields)));
    }catch (e){
            return response.errorResponse(e.message)
    }
}

exports.roomBooking = async (context) => {
    const user = context.user
    const dateBegin = moment(context.requestBody.dateBegin).format('YYYY-MM-DD')
    const dateEnd = moment(context.requestBody.dateEnd).format('YYYY-MM-DD')
    try {
        const roomIds = await roomController.findFreeRoomIds(dateBegin, dateEnd)
        if(!roomIds.includes(context.requestBody.roomId)) {
            return response.errorResponse(constants.ROOM_IS_BUSY)
        }
        const createBooking = await bookingController.createBooking({
            userId: user.id,
            roomId: context.requestBody.roomId,
            dateBegin: dateBegin,
            dateEnd: dateEnd,
            humanCount: context.requestBody.humanCount
        })
        if(!createBooking) {
            return response.errorResponse(constants.BOOKING_NOT_CREATED)
        }
        return response.successResponse(createBooking)
    }catch (e){
        return response.errorResponse(e.message)
    }
}
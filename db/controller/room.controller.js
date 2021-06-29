'use strict';
const db = require('../');

const createRoom = async (roomDTO) => {
    const result = await db.model.room.create({
        floor: roomDTO.floor,
        price: roomDTO.price,
        rooms: roomDTO.rooms

    });

    if (!result) {
        log.error('[createRoom] can not create room: ' + JSON.stringify(roomDTO, null, 4));
        return false;
    }
    const item = result.get({plain: true});
    log.debug(`[createRoom] room:` +  JSON.stringify(item, null, 4));
    return item;
};

const readRoom = async (roomId) => {
    const result = await db.model.room.findOne({
        where: {id: roomId}
    });
    if (result === null) {
        log.error('[readRoom] can not find Room: ' + roomId);
        return false;
    }
    log.debug(`[readRoom] result:` + JSON.stringify(result, null, 4));
    return result.get({plain: true})
};

const findFreeRooms = async (dateBegin, dateEnd) => {
    const result = await db.model.room.findAll({
        where: {id: {[db.Sequelize.Op.notIn]: db.Sequelize.literal(`(
                    SELECT room_id
                    FROM booking AS bookings
                    WHERE
                    bookings.date_begin >= '${dateBegin}' AND bookings.date_end <= '${dateEnd}'
                )`)}},
        order:[['price', 'asc']]
    });
    if (!result) {
        log.error('[findFreeRooms] can not find rooms');
        return false;
    }
     log.debug(`[findFreeRooms] result:` + JSON.stringify(result, null, 4));
    return Array.isArray(result) ? result.map(r => r.get({plain: true})) : [];
};

const findFreeRoomIds = async (dateBegin, dateEnd) => {
    const result = await db.model.room.findAll({
        attributes: ['id'],
        where: {id: {[db.Sequelize.Op.notIn]: db.Sequelize.literal(`(
                    SELECT room_id
                    FROM booking AS bookings
                    WHERE
                    bookings.date_begin >= '${dateBegin}' AND bookings.date_end <= '${dateEnd}'
                )`)}},
        order:[['price', 'asc']]
    });
    if (!result) {
        log.error('[findFreeRoomIds] can not find rooms');
        return false;
    }
    log.debug(`[findFreeRoomIds] result:` + JSON.stringify(result, null, 4));
    return Array.isArray(result) ? result.map(r => r.id) : [];
};


const updateRoom = async (roomDTO) => {
    log.debug(`[updateRoom] roomDTO:` +  JSON.stringify(roomDTO, null, 4));
    const room = await readRoom(roomDTO.id);
    if (!room) {
        log.error('[updateRoom] room was not found: ' + JSON.stringify(roomDTO, null, 4));
        return false;
    }
    room.rooms = roomDTO.rooms;
    room.price = roomDTO.price;
    room.floor = roomDTO.floor;

    const result = await db.model.room.update(room, {
        where: {
            id: room.id
        }
    });
    log.debug(`[updateRoom] result:` + Array.isArray(result) && result[0]);
    return Array.isArray(result) && result[0];
};

exports.createRoom = createRoom;
exports.readRoom = readRoom;
exports.findFreeRooms = findFreeRooms;
exports.findFreeRoomIds = findFreeRoomIds;
exports.updateRoom = updateRoom;




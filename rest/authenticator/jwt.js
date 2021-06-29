const jwt = require('jsonwebtoken');
const constant = require('../../lib/constants');

exports.getPayload = async (authorization) => {
    if (!authorization) {
        log.error('[jwt.getPayload] error: ' + constant.REQUIRED_TOKEN);
        return false;
    }
    try{
        const payload = await jwt.verify(authorization.split(' ')[1], process.env.JWT_SECRET);
        if(payload) {
            return payload;
        }
        log.error('[jwt.getPayload] error: ' + constant.AUTH_ERROR);
        return false;
    }catch (e) {
        log.error('[jwt.getPayload] error: ' + e.stack);
        return false;
    }
}

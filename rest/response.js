'use strict'
function generalResponse(error, data, details, errorCode){
    return {error: createError(error, details, errorCode), data: data};
}

function createError(error, details = null, errorCode = 500){
    if(!error){
        return {type: 200, message: null};
    }
    return {type: errorCode, message: error, details: details};
}

exports.errorResponse = (error, details = null, errorCode) => {
    return generalResponse(error, null, details, errorCode);
}

exports.successResponse = (data) => {
    return generalResponse(null, data, null);
}

'use strict';

/**
 * Return only those properties of {data} that are present in permittedFields[]
 * If permittedFields not present, returns all properties
 * @param {object} data
 * @param {string[]} permittedFields
 * @returns {Object}
 */
const getPermittedFields =  (data, permittedFields = []) =>{
    if(!data){
        return null;
    }
    if(!permittedFields.length){
        return data;
    }
    let result = {};
    for(const permittedField of permittedFields){
        if(permittedField in data){
            result[permittedField] = data[permittedField]  ;
        }
    }
    return result;
}



exports.getPermittedFields = getPermittedFields;


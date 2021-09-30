const dbValidatores = require('./db_validators');
const googleVerify  = require('./google_verify');
const jwtGenerator  = require('./jwt-generator');
const uploadFile    = require('./upload_file');

module.exports = {
    ...dbValidatores,
    ...googleVerify,
    ...jwtGenerator,
    ...uploadFile,
}
const fieldsValidator = require('../middlewares/field_validator');
const jwtValidator = require('../middlewares/jwt_validator');
const rolesValidator = require('../middlewares/roles_validator');
const fileValidator = require('../middlewares/file_validator');

module.exports = {
    ...fieldsValidator,
    ...jwtValidator,
    ...rolesValidator,
    ...fileValidator
}
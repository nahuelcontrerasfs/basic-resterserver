const fieldsValidator = require('../middlewares/field_validator');
const jwtValidator = require('../middlewares/jwt_validator');
const rolesValidator = require('../middlewares/roles_validator');

module.exports = {
    ...fieldsValidator,
    ...jwtValidator,
    ...rolesValidator
}
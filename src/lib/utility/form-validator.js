import {EMAIL_REGEX} from "../constant/form-constants";

const FormValidator = {
    email: function (str) {
        let string = str.toString();
        if (string.length === 0) {
            return false;
        }
        return EMAIL_REGEX.test(string);

    },
    password: function (str) {
        let string = str.toString();
        if (string.length === 0) {
            return false;
        }
        return string.replace(/\s/g, '').length;

    },
    requiredWithRegex: function (intl, fieldName, fieldValue = '', minLength = 0, regex = '') {
        fieldValue = fieldValue ? fieldValue.toString().toLowerCase(): '';
        if (fieldValue.trim() === "") {
            return intl && intl.hasOwnProperty('formatMessage') ?  intl.formatMessage(
                {id: 'app.empty.field', defaultMessage: '{field} is required'},
                {field: fieldName}
            ) : `${fieldName} is required`;
        }
        if (minLength > 0 && fieldValue.trim().length < minLength) {
            return intl && intl.hasOwnProperty('formatMessage') ? intl.formatMessage(
                {id: 'app.allowed.minLength', defaultMessage: '{field} needs to be at least {minLength} characters'},
                {field: fieldName, minLength: minLength}
            ) : `${fieldName} needs to be at least ${minLength} characters`;
        }
        if (regex && !regex.test(fieldValue)) {
            return intl && intl.hasOwnProperty('formatMessage') ? intl.formatMessage(
                {id: 'app.invalid.field', defaultMessage: 'Invalid {field}'},
                {field: fieldName}
            ) : `Invalid ${fieldName}`;
        }
        return null;
    }
};

export default FormValidator;

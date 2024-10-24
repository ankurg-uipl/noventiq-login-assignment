import { EMAIL_REGEX } from '../constant/form-constants';

const FormValidator = {
    email: (str) => {
        const string = str.toString();
        if (string.length === 0) {
            return false;
        }
        return EMAIL_REGEX.test(string);

    },
    password: (str) => {
        const string = str.toString();
        if (string.length === 0) {
            return false;
        }
        return string.replace(/\s/g, '').length;
    },
    requiredWithRegex: (intl, fieldName, fieldValue = '', minLength = 0, regex = '') => {
        fieldValue = fieldValue ? fieldValue.toString().toLowerCase(): '';
        if (fieldValue.trim() === '') {
            return intl?.formatMessage ? intl.formatMessage(
                { defaultMessage: '{field} is required', id: 'app.empty.field' },
                { field: fieldName }
            ) : `${fieldName} is required`;
        }
        if (minLength > 0 && fieldValue.trim().length < minLength) {
            return intl?.formatMessage ? intl.formatMessage(
                { defaultMessage: '{field} needs to be at least {minLength} characters', id: 'app.allowed.minLength' },
                { field: fieldName, minLength: minLength }
            ) : `${fieldName} needs to be at least ${minLength} characters`;
        }
        if (regex && !regex.test(fieldValue)) {
            return intl?.formatMessage ? intl.formatMessage(
                { defaultMessage: 'Invalid {field}', id: 'app.invalid.field' },
                { field: fieldName }
            ) :
                `Invalid ${fieldName}`;
        }
        return null;
    }
};

export default FormValidator;

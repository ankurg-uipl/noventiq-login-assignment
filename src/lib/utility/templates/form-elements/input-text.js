import PropTypes from 'prop-types';
import React from 'react';

InputText.propTypes = {
    error: PropTypes.string,
    handleBlur: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    inputName: PropTypes.string.isRequired,
    inputValue: PropTypes.string,
    label: PropTypes.string.isRequired,
    prepend: PropTypes.any
};

function InputText({ error, handleBlur, handleChange, inputName, inputValue, label, prepend }) {
    return (
        <div className="form-group row">
            <label className="col-sm-2 col-form-label" htmlFor={`input${inputName}`}>{label}</label>
            <div className="input-group col-sm-10">
                {prepend}
                <input className={`form-control ${error ? 'is-invalid' : ''}`} data-testid={`input${inputName}`}
                    id={`input${inputName}`}
                    name={inputName}
                    onBlur={handleBlur}
                    onChange={handleChange(inputName)}
                    placeholder={label}
                    type="text" value={inputValue} />
                <div className="invalid-feedback" data-testid={`error${inputName}`}>
                    {error}
                </div>
            </div>
        </div>
    );
}

export default InputText;
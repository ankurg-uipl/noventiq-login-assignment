import React from 'react';
import PropTypes from 'prop-types';

InputText.propTypes = {
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
    inputName: PropTypes.string.isRequired,
    error: PropTypes.string,
    label: PropTypes.string.isRequired,
    prepend: PropTypes.any
};

function InputText({ handleChange, handleBlur, inputName, error, label, prepend, inputValue }) {
    return (
        <div className="form-group row">
            <label htmlFor={`input${inputName}`} className="col-sm-2 col-form-label">{label}</label>
            <div className="input-group col-sm-10">
                {prepend}
                <input type={"text"} name={inputName}
                    onBlur={handleBlur}
                    value={inputValue}
                    onChange={handleChange(inputName)}
                    data-testid={`input${inputName}`}
                    className={`form-control ${error ? 'is-invalid' : ''}`}
                    id={`input${inputName}`} placeholder={label} />
                <div className="invalid-feedback" data-testid={`error${inputName}`}>
                    {error}
                </div>
            </div>
        </div>
    );
}

export default InputText;
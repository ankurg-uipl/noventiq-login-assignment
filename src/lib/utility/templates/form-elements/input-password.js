import PropTypes from 'prop-types';
import React, { useState } from 'react';

InputPassword.propTypes = {
    error: PropTypes.string,
    forgotPassword: PropTypes.any,
    handleBlur: PropTypes.func,
    handleChange: PropTypes.func,
    inputName: PropTypes.string,
    inputValue: PropTypes.string,
    label: PropTypes.string,
    showPasswordTitle: PropTypes.string
};

function InputPassword({ error, forgotPassword, handleBlur, handleChange, inputName, inputValue, label, showPasswordTitle }) {
    const [inputType, setInputType] = useState('password');

    const handleVisibility = () => {
        const type = inputType === 'password' ? 'text' : 'password'
        setInputType(type);
    }

    return (
        <div className="form-group row">
            <label className="col-sm-2 col-form-label" htmlFor={`input${inputName}`}>{label}</label>
            <div className="input-group col-sm-10">
                <div className="input-group-prepend">
                    <div className="input-group-text"><i className="fa fa-lock"></i></div>
                </div>
                <input className={`form-control ${error ? 'is-invalid' : ''}`} data-testid={`input${inputName}`}
                    id={`input${inputName}`}
                    name={inputName}
                    onBlur={handleBlur}
                    onChange={handleChange(inputName)}
                    placeholder={label}
                    type={inputType}
                    value={inputValue} />
                <div className="input-group-append">
                    <div className="input-group-text" data-testid={'showpassword'} onClick={handleVisibility} style={{ background: 'none', cursor: 'pointer' }} title={showPasswordTitle}><i className="fa fa-eye"></i></div>
                </div>
                <div className="invalid-feedback" data-testid={`error${inputName}`}>
                    {error}
                </div>
                {forgotPassword}
            </div>
        </div>
    );
}

export default InputPassword;
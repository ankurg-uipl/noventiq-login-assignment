import React, { useState } from 'react';
import PropTypes from 'prop-types';

InputPassword.propTypes = {
    handleChange: PropTypes.func,
    handleBlur: PropTypes.func,
    inputName: PropTypes.string,
    inputValue: PropTypes.string,
    error: PropTypes.string,
    label: PropTypes.string,
    forgotPassword: PropTypes.func
};

function InputPassword({ handleChange, handleBlur, inputName, inputValue, error, label, forgotPassword }) {
    const [inputType, setInputType] = useState('password');

    const handleVisibility = () => {
        const type = inputType === 'password' ? 'text' : 'password'
        setInputType(type);
    }

    return (
        <div className="form-group row">
            <label htmlFor={`input${inputName}`} className="col-sm-2 col-form-label">{label}</label>
            <div className="input-group col-sm-10">
                <div className="input-group-prepend">
                    <div className="input-group-text"><i className="fa fa-lock"></i></div>
                </div>
                <input type={inputType} name={inputName}
                    onBlur={handleBlur}
                    value={inputValue}
                    onChange={handleChange(inputName)}
                    className={`form-control ${error ? 'is-invalid' : ''}`}
                    id={`input${inputName}`}
                    data-testid={`input${inputName}`}
                    placeholder={label} />
                <div className="input-group-append">
                    <div className="input-group-text" data-testid={"showpassword"} style={{ background: "none", cursor: "pointer" }} onClick={handleVisibility}><i className="fa fa-eye"></i></div>
                </div>
                <div className="invalid-feedback" data-testid={`error${inputName}`}>
                    {error}
                </div>
                <div className='forgotPassword'>
                    <a href='!#' onClick={(e) => {
                        e.preventDefault();
                        forgotPassword()
                    }
                    }>Forgot Password</a>
                </div>
            </div>
        </div>
    );
}

export default InputPassword;
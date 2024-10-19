import PropTypes from 'prop-types';
import React from 'react';

Checkbox.propTypes = {
    handleBlur: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    inputName: PropTypes.string.isRequired,
    ischecked: PropTypes.any,
    label: PropTypes.string.isRequired
};

function Checkbox({ handleBlur, handleChange, inputName, ischecked, label}) {
    return (
        <div className="form-group row">
            <div className="col-sm-2 col-form-label"></div>
            <div className="col-sm-10">
                <div className="custom-control custom-switch">
                    <input checked={!!ischecked}
                        className="custom-control-input"
                        data-testid={`input${inputName}`}
                        id={`input${inputName}`}
                        name={inputName}
                        onBlur={handleBlur}
                        onChange={handleChange(inputName)} type="checkbox" />
                    <label className="custom-control-label" htmlFor={`input${inputName}`}>{label}</label>
                </div>
            </div>
        </div>
    );
}

export default Checkbox;
import React from 'react';
import PropTypes from 'prop-types';

Checkbox.propTypes = {
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
    inputName: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    ischecked: PropTypes.any
};

function Checkbox({ handleChange, handleBlur, inputName, label, ischecked}) {
    return (
        <div className="form-group row">
            <div className="col-sm-2 col-form-label"></div>
            <div className="col-sm-10">
                <div className="custom-control custom-switch">
                    <input type="checkbox"
                        name={inputName}
                        onBlur={handleBlur}
                        checked={!!ischecked}
                        onChange={handleChange(inputName)}
                        data-testid={`input${inputName}`}
                        className="custom-control-input" id={`input${inputName}`} />
                    <label className="custom-control-label" htmlFor={`input${inputName}`}>{label}</label>
                </div>
            </div>
        </div>
    );
}

export default Checkbox;
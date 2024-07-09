import React from 'react';
import PropTypes from 'prop-types';

SelectBox.propTypes = {
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
    inputName: PropTypes.string.isRequired,
    error: PropTypes.string,
    label: PropTypes.string,
    optionConfig: PropTypes.shape({
        isArrayOfObject: PropTypes.bool.isRequired,
        dropDownOptions: PropTypes.array.isRequired,
        labelKey: PropTypes.string,
        vauleKey: PropTypes.string,
        defaultOptionLabel: PropTypes.string.isRequired
    }).isRequired,
    selectValue: PropTypes.string
};

function SelectBox({ handleChange, handleBlur, inputName, error, label, optionConfig, selectValue }) {
    return (
        <div className="form-group row">
            <label htmlFor={`input${inputName}`} className="col-sm-2 col-form-label">{label}</label>
            <div className="col-sm-10">
                <select name={inputName}
                    onBlur={handleBlur}
                    value={selectValue}
                    className={`form-control ${error ? 'is-invalid' : ''}`}
                    data-testid={`input${inputName}`}
                    onChange={handleChange(inputName)} id={`input${inputName}`}>
                    {/* <option data-testid="select-option" value={""}>{optionConfig.defaultOptionLabel}</option> */}
                    {
                        optionConfig?.dropDownOptions?.map((item, key) => {
                            const optionValue = optionConfig?.isArrayOfObject ? item[optionConfig?.valueKey] : item;
                            return <option key={key} data-testid="select-option" value={optionValue}>{optionConfig?.isArrayOfObject ? item[optionConfig?.labelKey] : item}</option>
                        })
                    }
                </select>
                <div className="invalid-feedback" data-testid={`error${inputName}`}>
                    {error}
                </div>
            </div>
        </div>
    );
}

export default SelectBox;
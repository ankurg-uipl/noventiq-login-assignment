import PropTypes from 'prop-types';
import React from 'react';

SelectBox.propTypes = {
    error: PropTypes.string,
    handleBlur: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    inputName: PropTypes.string.isRequired,
    label: PropTypes.string,
    optionConfig: PropTypes.shape({
        defaultOptionLabel: PropTypes.string.isRequired,
        dropDownOptions: PropTypes.array.isRequired,
        isArrayOfObject: PropTypes.bool.isRequired,
        labelKey: PropTypes.string,
        valueKey: PropTypes.string
    }).isRequired,
    selectValue: PropTypes.string
};

function SelectBox({ error, handleBlur, handleChange, inputName, label, optionConfig, selectValue }) {
    return (
        <div className="form-group row">
            <label className="col-sm-2 col-form-label" htmlFor={`input${inputName}`}>{label}</label>
            <div className="col-sm-10">
                <select className={`form-control ${error ? 'is-invalid' : ''}`}
                    data-testid={`input${inputName}`}
                    id={`input${inputName}`}
                    name={inputName}
                    onBlur={handleBlur}
                    onChange={handleChange(inputName)} value={selectValue}>
                    {/* <option data-testid="select-option" value={""}>{optionConfig.defaultOptionLabel}</option> */}
                    {
                        optionConfig?.dropDownOptions?.map((item, key) => {
                            const optionValue = optionConfig?.isArrayOfObject ? item[optionConfig?.valueKey] : item;
                            return <option data-testid="select-option" key={key} value={optionValue}>{optionConfig?.isArrayOfObject ? item[optionConfig?.labelKey] : item}</option>
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
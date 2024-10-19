import React, { useContext } from 'react';
import { useIntl } from 'react-intl';

import logo from '../../../noventiq-logo.svg'
import { LANGUAGE } from '../../constant/common-constant';
import { CORPORATE_EMAIL_REGEX } from '../../constant/form-constants';
import { useFormHook } from '../../hooks/use-form.hook';
import LanguageContext from '../../i18n/language-context';
import FormValidator from '../../utility/form-validator';
import Checkbox from '../../utility/templates/form-elements/checkbox';
import InputPassword from '../../utility/templates/form-elements/input-password';
import InputText from '../../utility/templates/form-elements/input-text';
import SelectBox from '../../utility/templates/form-elements/select-box';


function Login() {
    const intl = useIntl();
    // receiving and updating language from context
    const { language, setLanguage } = useContext(LanguageContext);

    const {
        data, // access to the form data
        errors, // includes the errors to show
        handleBlur, // handles input blur
        handleChange, // handles input changes
        handleSubmit, // handles form submission
        // resetForm
    } = useFormHook({
        initialValues: { email: '', language: language, password: '', remember: '' },
        onSubmit: () => {
            console.log("Form Submitted successfully");
            // console.log('form data', data);
            alert(`Form Submitted successfully ${JSON.stringify(data).toString()}`);
        },
        validations: {
            email: value => FormValidator.requiredWithRegex(intl, intl.formatMessage({ defaultMessage: "Email", id: "app.label.email" }), value, 0, CORPORATE_EMAIL_REGEX),
            password: value => FormValidator.requiredWithRegex(intl, intl.formatMessage({ defaultMessage: "Password", id: "app.label.password" }), value, 0, '')
        }
    });
    return (
        <>
            <div className='container pt-2'>
                <div className='row'>
                    <div className="col-md-6 m-auto">
                        <img alt="logo" className='logo' src={logo} />
                        <form onSubmit={handleSubmit}>
                            <div className='formBox'>
                                <InputText
                                    error={errors.email}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                    inputName={"email"}
                                    inputValue={data.email}
                                    label={intl.formatMessage({ defaultMessage: "Email", id: "app.label.email" })}
                                    prepend={<div className="input-group-prepend">
                                        <div className="input-group-text"><i className="fa fa-envelope"></i></div>
                                    </div>}
                                />

                                <InputPassword
                                    error={errors.password}
                                    forgotPassword={<div className='forgotPassword'>
                                        <a href='!#' onClick={(e) => {
                                            e.preventDefault();
                                            console.log('do magic')
                                        }
                                        }>{intl.formatMessage({ defaultMessage: "Forgot Password", id: "app.text.forgotPassword" })}</a>
                                    </div>}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                    inputName={"password"}
                                    inputValue={data.password}
                                    label={intl.formatMessage({ defaultMessage: "Password", id: "app.label.password" })}
                                    showPasswordTitle={intl.formatMessage({ defaultMessage: "Show Password", id: "app.text.showPassword" })}
                                />

                                <SelectBox
                                    handleBlur={handleBlur}
                                    handleChange={(name) => (e) => {
                                        handleChange(name)(e);
                                        setLanguage(e.target.value);
                                    }}
                                    inputName={"language"}
                                    inpValue={data.language}
                                    label={intl.formatMessage({ defaultMessage: "Language", id: "app.label.language" })}
                                    optionConfig={{ defaultOptionLabel: 'Select perferred language', dropDownOptions: LANGUAGE, isArrayOfObject: true, labelKey: 'label', valueKey: 'code' }}
                                />

                                <Checkbox
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                    inputName={"remember"}
                                    ischecked={data.remember}
                                    label={intl.formatMessage({ defaultMessage: "Remember me", id: "app.label.remember" })}
                                />
                            </div>
                            <div className="form-group row text-center pt-3">
                                <div className="col-sm-12">
                                    <button className="btn btn-lg btn-primary loginBtn" data-testid="submitBtn" type="submit">{intl.formatMessage({ defaultMessage: "Log in", id: "app.button.login" })}</button>
                                </div>
                                {/* <button type='button' onClick={() => resetForm()}>Reset</button> */}
                            </div>

                        </form>
                    </div>
                </div>
            </div>
            <div className='copyright'>
                <p>Copyright {(new Date())?.getFullYear()} Noventiq | Powered by Noventiq</p>
            </div>
        </>
    );
}

export default Login;
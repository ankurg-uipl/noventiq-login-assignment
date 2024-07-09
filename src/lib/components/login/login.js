import React, { useContext } from 'react';
import logo from '../../../noventiq-logo.svg'
import { useFormHook } from '../../hooks/use-form.hook';
import FormValidator from '../../utility/form-validator';
import { CORPORATE_EMAIL_REGEX } from '../../constant/form-constants';
import InputPassword from '../../utility/templates/form-elements/input-password';
import InputText from '../../utility/templates/form-elements/input-text';
import SelectBox from '../../utility/templates/form-elements/select-box';
import { LANGUAGE } from '../../constant/common-constant';
import Checkbox from '../../utility/templates/form-elements/checkbox';
import { useIntl } from 'react-intl';
import LanguageContext from '../../i18n/language-context';


function Login() {
    const intl = useIntl();
    // receiving and updating language from context
    const { language, setLanguage } = useContext(LanguageContext);

    const {
        handleSubmit, // handles form submission
        handleChange, // handles input changes
        handleBlur, // handles input blur
        data, // access to the form data
        errors, // includes the errors to show
        // resetForm
    } = useFormHook({
        validations: {
            email: value => FormValidator.requiredWithRegex(intl, intl.formatMessage({ id: "app.label.email", defaultMessage: "Email" }), value, 0, CORPORATE_EMAIL_REGEX),
            password: value => FormValidator.requiredWithRegex(intl, intl.formatMessage({ id: "app.label.password", defaultMessage: "Password" }), value, 0, '')
        },
        onSubmit: () => {
            console.log("Form Submitted successfully");
            console.log('form data', data);
        },
        initialValues: { email: '', password: '', language: language, remember: '' },
    });
    return (
        <>
            <div className='container pt-2'>
                <div className='row'>
                    <div className="col-md-6 m-auto">
                        <img src={logo} alt="logo" className='logo' />
                        <form onSubmit={handleSubmit}>
                            <div className='formBox'>
                                <InputText
                                    inputName={"email"}
                                    inputValue={data.email}
                                    label={intl.formatMessage({ id: "app.label.email", defaultMessage: "Email" })}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    error={errors.email}
                                    prepend={<div className="input-group-prepend">
                                        <div className="input-group-text"><i className="fa fa-envelope"></i></div>
                                    </div>}
                                />

                                <InputPassword
                                    inputName={"password"}
                                    inputValue={data.password}
                                    label={intl.formatMessage({ id: "app.label.password", defaultMessage: "Password" })}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    error={errors.password}
                                    showPasswordTitle={intl.formatMessage({ id: "app.text.showPassword", defaultMessage: "Show Password" })}
                                    forgotPassword={<div className='forgotPassword'>
                                        <a href='!#' onClick={(e) => {
                                            e.preventDefault();
                                            console.log('do magic')
                                        }
                                        }>{intl.formatMessage({ id: "app.text.forgotPassword", defaultMessage: "Forgot Password" })}</a>
                                    </div>}
                                />

                                <SelectBox
                                    inputName={"language"}
                                    label={intl.formatMessage({ id: "app.label.language", defaultMessage: "Language" })}
                                    inpValue={data.language}
                                    handleChange={(name) => (e) => {
                                        handleChange(name)(e);
                                        setLanguage(e.target.value);
                                    }}
                                    handleBlur={handleBlur}
                                    optionConfig={{ isArrayOfObject: true, labelKey: 'label', valueKey: 'code', dropDownOptions: LANGUAGE, defaultOptionLabel: 'Select perferred language' }}
                                />

                                <Checkbox
                                    inputName={"remember"}
                                    label={intl.formatMessage({ id: "app.label.remember", defaultMessage: "Remember me" })}
                                    ischecked={data.remember}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                />
                            </div>
                            <div className="form-group row text-center pt-3">
                                <div className="col-sm-12">
                                    <button type="submit" data-testid="submitBtn" className="btn btn-lg btn-primary loginBtn">{intl.formatMessage({ id: "app.button.login", defaultMessage: "Log in" })}</button>
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
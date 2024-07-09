import React from 'react';
import logo from '../../../noventiq-logo.svg'
import { useFormHook } from '../../hooks/use-form.hook';
import FormValidator from '../../utility/form-validator';
import { CORPORATE_EMAIL_REGEX } from '../../constant/form-constants';
import InputPassword from '../../utility/templates/form-elements/input-password';
import InputText from '../../utility/templates/form-elements/input-text';
import SelectBox from '../../utility/templates/form-elements/select-box';
import { LANGUAGE } from '../../constant/common-constant';
import Checkbox from '../../utility/templates/form-elements/checkbox';


function Login() {
    const {
        handleSubmit, // handles form submission
        handleChange, // handles input changes
        handleBlur, // handles input blur
        data, // access to the form data
        errors, // includes the errors to show
        resetForm
    } = useFormHook({
        validations: {
            email: value => FormValidator.requiredWithRegex('', "Email Address", value, 0, CORPORATE_EMAIL_REGEX),
            password: value => FormValidator.requiredWithRegex('', "Password", value, 0, '')
        },
        onSubmit: () => {
            console.log("Form Submitted successfully");
            // console.log('form data', data);
        },
        initialValues: { email: '', password: '', language: 'en', remember: '' },
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
                                    label={"Email"}
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
                                    label={"Password"}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    error={errors.password}
                                    forgotPassword={() => console.log('do magic')}
                                />

                                <SelectBox
                                    inputName={"language"}
                                    label={"Language"}
                                    inpValue={data.language}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    optionConfig={{ isArrayOfObject: true, labelKey: 'label', valueKey: 'code', dropDownOptions: LANGUAGE, defaultOptionLabel: 'Select perferred language' }}
                                />

                                <Checkbox
                                    inputName={"remember"}
                                    label={"Remember me"}
                                    ischecked={data.remember}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                />
                            </div>
                            <div className="form-group row text-center pt-3">
                                <div className="col-sm-12">
                                    <button type="submit" data-testid="submitBtn" className="btn btn-lg btn-primary loginBtn">Sign in</button>
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
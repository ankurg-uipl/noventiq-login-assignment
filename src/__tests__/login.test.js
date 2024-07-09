import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react"
import Login from "../lib/components/login/login";
import LanguageWrapper from "../lib/i18n/language-wrapper";


afterEach(cleanup);

const renderWithReactIntl = (component) => {
    return render(<LanguageWrapper>
                   {component}
                  </LanguageWrapper>
    );
  };

describe("Test Email Fields", () => {
    test('Email Input should exist', () => {
        const { getByTestId } = renderWithReactIntl(<Login />);
        const element = getByTestId('inputemail');
        expect(element).toBeInTheDocument();
    })

    test('Label Email should exist', () => {
        const { getByLabelText } = renderWithReactIntl(<Login />);
        expect(getByLabelText('Email')).toBeInTheDocument();
    })

    test('Email Input value should change', () => {
        const { getByTestId } = renderWithReactIntl(<Login />);
        const element = getByTestId('inputemail');
        fireEvent.change(element, { target: { value: 'dummy@gmail.com' } });
        expect(element.value).toBe('dummy@gmail.com');
    })


    test('Should show Required Message', () => {
        const { getByTestId } = renderWithReactIntl(<Login />);
        const element = getByTestId('inputemail');
        fireEvent.blur(element);
        expect(getByTestId("erroremail")).toHaveTextContent("Email is required");
    })

    test('Should show invalid Email', () => {
        const { getByTestId } = renderWithReactIntl(<Login />);
        const element = getByTestId('inputemail');
        fireEvent.change(element, { target: { value: 'dummy@gmail.com' } });
        fireEvent.blur(element);
        expect(getByTestId("erroremail")).toHaveTextContent("Invalid Email");
    })

    test('Should not show invalid Email', () => {
        const { getByTestId } = renderWithReactIntl(<Login />);
        const element = getByTestId('inputemail');
        fireEvent.change(element, { target: { value: 'a@brownsugar.com' } });
        fireEvent.blur(element);
        expect(getByTestId("erroremail")).toHaveTextContent("");
    })
})

describe("Test Password Field", () => {
    test('Password Input should exist', () => {
        const { getByTestId } = renderWithReactIntl(<Login />);
        const element = getByTestId('inputpassword');
        expect(element).toBeInTheDocument();
    })

    test('Label Password should exist', () => {
        const { getByLabelText } = renderWithReactIntl(<Login />);
        expect(getByLabelText('Password')).toBeInTheDocument();
    })

    test('Password Input value should change', () => {
        const { getByTestId } = renderWithReactIntl(<Login />);
        const element = getByTestId('inputpassword');
        fireEvent.change(element, { target: { value: '12345' } });
        expect(element.value).toBe('12345');
    })

    test('Should show Required Message', () => {
        const { getByTestId } = renderWithReactIntl(<Login />);
        const element = getByTestId('inputpassword');
        fireEvent.blur(element);
        expect(getByTestId("errorpassword")).toHaveTextContent("Password is required");
    })


    test('Should show Temporary Password', () => {
        const { getByTestId } = renderWithReactIntl(<Login />);
        const element = getByTestId('inputpassword');
        const btn = getByTestId('showpassword');
        fireEvent.click(btn);
        expect(element.type).toBe("text");
    })

})


describe("Test Language Field", () => {
    test('Language Selection should exist', () => {
        const { getByTestId } = renderWithReactIntl(<Login />);
        const element = getByTestId('inputlanguage');
        expect(element).toBeInTheDocument();
    })

    test('Label Language should exist', () => {
        const { getByLabelText } = renderWithReactIntl(<Login />);
        expect(getByLabelText('Language')).toBeInTheDocument();
    })

    test('Should have 3 Options', () => {
        const { getAllByTestId } = renderWithReactIntl(<Login />);
        const options = getAllByTestId('select-option');
        expect(options).toHaveLength(3);
    })

    test('Should Match Default Language', () => {
        const { getByTestId } = renderWithReactIntl(<Login />);
        const element = getByTestId('inputlanguage');
        expect(element.value).toBe('en');
    })

    test('Should Change to Hindi Option', () => {
        const { getByTestId, getAllByTestId } = renderWithReactIntl(<Login />);
        const element = getByTestId('inputlanguage');
        const options = getAllByTestId('select-option');
        fireEvent.change(element, { target: { value: 'hi' } });
        expect(element.value).toBe('hi');
        expect(options[0].selected).toBeFalsy();
        expect(options[1].selected).toBeTruthy();
    })

})

describe("Test Remember me Field", () => {
    test('Remember Switch should exist', () => {
        const { getByTestId } = renderWithReactIntl(<Login />);
        const element = getByTestId('inputremember');
        expect(element).toBeInTheDocument();
    })

    test('Label Remember me should exist', () => {
        const { getByLabelText } = renderWithReactIntl(<Login />);
        expect(getByLabelText('Remember me')).toBeInTheDocument();
    })

    test('Default value should be empty or falsy ', () => {
        const { getByTestId } = renderWithReactIntl(<Login />);
        const element = getByTestId('inputremember');
        expect(element.checked).toBeFalsy();
    })

    test('Should change the value on checkbok click ', () => {
        const { getByTestId } = renderWithReactIntl(<Login />);
        const element = getByTestId('inputremember');
        fireEvent.click(element)
        expect(element.checked).toBeTruthy();
    })

    test('Should change the value on label click', () => {
        const { getByTestId, getByLabelText } = renderWithReactIntl(<Login />);
        const element = getByTestId('inputremember');
        fireEvent.click(getByLabelText('Remember me'))
        expect(element.checked).toBeTruthy();
    })

})

describe("Test Submit Button", () => {
    test("Submit Button Should Exist", () => {
        const { getByTestId } = renderWithReactIntl(<Login />);
        expect(getByTestId('submitBtn')).toBeInTheDocument();
    })

    test("Should show errors on input fields when submit form ", () => {
        const { getByTestId } = renderWithReactIntl(<Login />);
        const btn = getByTestId('submitBtn');
        fireEvent.click(btn);
        expect(getByTestId('erroremail')).toHaveTextContent('Email is required');
        expect(getByTestId('errorpassword')).toHaveTextContent('Password is required');
    })

    test("Should show success message when submit form", () => {
        const logSpy = jest.spyOn(console, 'log');
        const { getByTestId } = renderWithReactIntl(<Login />);
        const password = getByTestId('inputpassword');
        fireEvent.change(password, { target: { value: '12345' } });
        const email = getByTestId('inputemail');
        fireEvent.change(email, { target: { value: 'a@brownsugar.com' } });
        const btn = getByTestId('submitBtn');
        fireEvent.click(btn);
        expect(getByTestId('erroremail')).toHaveTextContent('');
        expect(getByTestId('errorpassword')).toHaveTextContent('');
        expect(logSpy).toHaveBeenCalledWith("Form Submitted successfully");
    })
})
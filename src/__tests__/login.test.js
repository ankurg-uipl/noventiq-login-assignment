import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import Login from "../lib/components/login/login"

afterEach(cleanup);

describe("Test Email Fields", () => {
    test('Email Input should exist', () => {
        const {getByTestId} = render(<Login />);
        const element = getByTestId('inputemail');
        expect(element).toBeInTheDocument();
    })
    
    test('Lable Email should exist', () => {
        const {getByLabelText} = render(<Login />);
        expect(getByLabelText('Email')).toBeInTheDocument();
    })
    
    test('Email Input value should change', () => {
        const {getByTestId} = render(<Login />);
        const element = getByTestId('inputemail');
        fireEvent.change(element, {target: {value: 'dummy@gmail.com'}});
        expect(element.value).toBe('dummy@gmail.com');
    })

   
    test('Should show Required Message', async () => {
        const {getByTestId} = render(<Login />);
        const element = getByTestId('inputemail');
        fireEvent.blur(element);
        expect(getByTestId("erroremail")).toHaveTextContent("Email Address is required");
    })
    
    test('Should show invalid Email', async () => {
        const {getByTestId} = render(<Login />);
        const element = getByTestId('inputemail');
        fireEvent.change(element, {target: {value: 'dummy@gmail.com'}});
        fireEvent.blur(element);
        expect(getByTestId("erroremail")).toHaveTextContent("Invalid Email Address");
    })
    
    test('Should not show invalid Email', async () => {
        const {getByTestId} = render(<Login />);
        const element = getByTestId('inputemail');
        fireEvent.change(element, {target: {value: 'a@brownsugar.com'}});
        fireEvent.blur(element);
        expect(getByTestId("erroremail")).toHaveTextContent("");
    })
})

describe("Test Password Field", ()=> {
    test('Password Input should exist', () => {
        const {getByTestId} = render(<Login />);
        const element = getByTestId('inputpassword');
        expect(element).toBeInTheDocument();
    })
    
    test('Lable Password should exist', () => {
        const {getByLabelText} = render(<Login />);
        expect(getByLabelText('Password')).toBeInTheDocument();
    })
    
    test('Password Input value should change', () => {
        const {getByTestId} = render(<Login />);
        const element = getByTestId('inputpassword');
        fireEvent.change(element, {target: {value: '12345'}});
        expect(element.value).toBe('12345');
    })
   
    test('Should show Required Message', async () => {
        const {getByTestId} = render(<Login />);
        const element = getByTestId('inputpassword');
        fireEvent.blur(element);
        expect(getByTestId("errorpassword")).toHaveTextContent("Password is required");
    })

   
    test('Should show Temporary Password', async () => {
        const {getByTestId} = render(<Login />);
        const element = getByTestId('inputpassword');
        const btn = getByTestId('showpassword');
        fireEvent.click(btn);
        expect(element.type).toBe("text");
    })
    
})
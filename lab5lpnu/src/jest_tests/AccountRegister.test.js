import React from 'react';
import {fireEvent, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import {BrowserRouter as Router} from "react-router-dom";
import {act} from "react-dom/test-utils";
import AccountRegister from "../Pages/AccountRegister";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks()

const data = {data: "New user is successfully added"}

describe("Register page", () => {
    it("renders AccountRegister with form", () => {
        render(<Router><AccountRegister /></Router>);
        expect(screen.getByTestId("RegForm")).toBeInTheDocument();
    });

    it("signs up user", async () => {
        await act(async () => {
            await fetch.mockImplementationOnce(() => Promise.resolve(data));
            render (<Router><AccountRegister /></Router>);
        });

        const signButton = screen.getByTestId("RegForm").querySelector(".signUpButton");
        fireEvent.click(signButton);

        await expect(fetch).toHaveBeenCalledWith("http://localhost:8089/api/v1/authentication/register", {
            method: 'POST',
            body: JSON.stringify({
                username: '',
                firstname: '',
                lastname: '',
                email: '',
                password: '',
                location_idlocation: ''
            }),
            headers: { 'Content-Type': 'application/json' },
        });
        await expect(fetch).toHaveBeenCalledTimes(1);
    });

})
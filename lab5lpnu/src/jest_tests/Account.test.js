import React from 'react';
import {render} from "@testing-library/react";
import '@testing-library/jest-dom';
import {BrowserRouter as Router} from "react-router-dom";
import {act} from "react-dom/test-utils";
import fetchMock from "jest-fetch-mock";
import Account from "../Pages/Account";

fetchMock.enableMocks()

const data = {data: {
        username: 'alex123',
        firstname: 'TEST1',
        lastname: 'TEST2',
        email: 'TEST@gmail.com',}};

describe("Account page", () => {

    it("renders Account and shows its data", async () => {
        await act(async () => {
            await fetch.mockImplementationOnce(() => Promise.resolve(data));
            render(<Router><Account /></Router>);
        })

        const headers = new Headers();
        headers.set('Authorization', `Basic ${btoa('alex123:12345')}`)
        headers.set('content-type', 'application/json')

        await expect(fetch).toHaveBeenCalledWith("http://localhost:8089/api/v1/user/alex123", {
            method: 'GET',
            headers,
        });

        await expect(fetch).toHaveBeenCalledTimes(1)
    });
});
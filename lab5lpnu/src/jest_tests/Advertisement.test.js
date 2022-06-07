import React from 'react';
import {render} from "@testing-library/react";
import '@testing-library/jest-dom';
import {BrowserRouter as Router} from "react-router-dom";
import {act} from "react-dom/test-utils";
import fetchMock from "jest-fetch-mock";
import Advertisement from "../Pages/Advertisement/Advertisement";

fetchMock.enableMocks()

const data = {
    id:'1',
    text: 'BUY SMTH',
    DataOfPublishing: "2022-05-19 9:53:00",
    status: 'open',
    idLocation: '1',
    idCategory: '1',
    idUser: '1'}

describe("Ad get page", () => {


    it('renders the ad and shows its data', async () => {
        await act(async () => {
            await fetch.mockImplementationOnce(() => Promise.resolve(data));
            render(<Router><Advertisement /></Router>);
        });

        const headers = new Headers();
        headers.set('Authorization', `Basic ${btoa('alex123:12345')}`);
        headers.set('content-type', 'application/json');

        await expect(fetch).toHaveBeenCalledWith("http://localhost:8089/api/v1/advertisement/1", {
            method: 'GET',
            headers,
        });

        await expect(fetch).toHaveBeenCalledTimes(1);

    });
});
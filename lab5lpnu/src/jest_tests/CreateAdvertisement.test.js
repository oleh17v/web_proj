import React from 'react';
import {fireEvent, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import {BrowserRouter as Router} from "react-router-dom";
import {act} from "react-dom/test-utils";
import CreateAdvertisement from "../Pages/Advertisement/CreateAdvertisement";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks()

const data = {
    text: 'AHALAIMAHALAI',
    DataOfPublishing: '2022-05-19 9:53:00',
    status: 'open',
    idLocation: '1',
    idCategory: '1',
    idUser: '31',}

describe("Create Advertisement page", () => {


    it("renders ad and create advertisement", async () => {
        localStorage.setItem("loggedUser", true)

        await act(async () => {
            await fetch.mockImplementationOnce(() => Promise.resolve(JSON.stringify(data)));
            render(<Router><CreateAdvertisement /></Router>);
        });

        const headers = new Headers();
        headers.set('Authorization', `Basic ${btoa('alex123:12345')}`);
        headers.set('content-type', 'application/json');

        const editButton = screen.getByTestId("createAdButton");
        fireEvent.click(editButton);

        await expect(fetch).toHaveBeenCalledTimes(1);
    });
});
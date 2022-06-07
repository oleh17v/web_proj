import React from 'react';
import {render} from "@testing-library/react";
import '@testing-library/jest-dom';
import {BrowserRouter as Router} from "react-router-dom";
import {act} from "react-dom/test-utils";
import fetchMock from "jest-fetch-mock";
import ViewAllAdvertisement from "../Pages/Advertisement/ViewAllAdvertisement";


fetchMock.enableMocks()


const data = {data: {ads: [
            {
                text: 'BUY SMTH',
                DataOfPublishing: "2022-05-19 9:53:00",
                status: 'open',
                idLocation: '1',
                idCategory: '1',
                idUser: '1'
            },
            {
                text: 'SDFL:FSDLF<SDLFMLKSDFMKLFM',
                DataOfPublishing: "2022-05-19 9:53:00",
                status: 'open',
                idLocation: '1',
                idCategory: '1',
                idUser: '1'
            },
            {
                text: 'HIRING FOR SMTH',
                DataOfPublishing: "2022-05-19 9:53:00",
                status: 'close',
                idLocation: '1',
                idCategory: '1',
                idUser: '1'
            }
        ]}}

describe("View advertisement page", () => {

    localStorage.setItem("loggedUser", true)

    it("renders list of ads and shows info", async () => {
        await act(async () => {
            await fetch.mockImplementationOnce(() => Promise.resolve(data));
            render(<Router><ViewAllAdvertisement /></Router>);
        });

        const headers = new Headers();
        headers.set('Authorization', `Basic ${btoa('alex123:12345')}`);
        headers.set('content-type', 'application/json');

        await expect(fetch).toHaveBeenCalledWith("http://localhost:8089/api/v1/advertisement/username/alex123", {
            method: 'GET',
            headers,
        });

        await expect(fetch).toHaveBeenCalledTimes(1);
    });
});



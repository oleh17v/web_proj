import React from 'react';
import {fireEvent, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import {BrowserRouter as Router} from "react-router-dom";
import {act} from "react-dom/test-utils";
import fetchMock from "jest-fetch-mock";
import EditAdvertisement from "../Pages/Advertisement/EditAdvertisement";

fetchMock.enableMocks()

const data = {data: {
        text: 'HIRING FOR SMTH',
        DataOfPublishing: "2022-05-19 9:53:00",
        status: 'open',
        idLocation: '1',
        idCategory: '1',
        idUser: '1'}};


const data2 = {data: {
        text: 'DSDDSDDSDFSFFSFFS',
        DataOfPublishing: "2022-05-19 9:53:00",
        status: 'open',
        idLocation: '1',
        idCategory: '1',
        idUser: '1'}};

describe("Edit advertisement page", () => {


    it("updates ad", async () => {

        localStorage.setItem("loggedUser", true)

        await act(async () => {
            await fetch.mockImplementationOnce(() => Promise.resolve(data));
            render(<Router><EditAdvertisement /></Router>);
        });
        const editButton = screen.getByTestId("edit_button");
        fireEvent.click(editButton);

        await fetch.mockImplementationOnce(() => Promise.resolve(data2));


        const headers = new Headers();
        headers.set('Authorization', `Basic ${btoa('alex123:12345')}`);
        headers.set('content-type', 'application/json');


        await expect(fetch).toHaveBeenCalledTimes(1);

    });

});
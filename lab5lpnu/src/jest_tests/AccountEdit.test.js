import React from 'react';
import {fireEvent, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import {BrowserRouter as Router} from "react-router-dom";
import {act} from "react-dom/test-utils";
import fetchMock from "jest-fetch-mock";
import AccountEdit from "../Pages/AccountEdit";


fetchMock.enableMocks()

const data = {data: {user: {
            firstname: "TEST2",
            lastname: "TEST1",
            username: "alex123",
            email: "TEST@gmail.com",
            password: "12345",
            location_idlocation: "1"
        }}};

const changed_data = {data: {user: {
            firstname: "TESTCHANGE",
            lastname: "TESTCH2",
            username: "oleg12v",
            email: "oleg12v@gmail.com",
            password: "12345678",
            location_idlocation: "2"
        }}};

const deleted_data = {data: "Successful delete."};


describe("Edit user page", () => {



    it("updates user", async () => {
        await act(async () => {
            await fetch.mockImplementationOnce(() => Promise.resolve(data));
            render(<Router><AccountEdit /></Router>);
        });

        await fetch.mockImplementationOnce(() => Promise.resolve(changed_data));

        const editButton = screen.getByTestId("edit");
        fireEvent.click(editButton);

        const headers = new Headers();
        headers.set('Authorization', `Basic ${btoa('alex123:12345')}`);
        headers.set('content-type', 'application/json');
        expect(fetch)
            .toHaveBeenCalledTimes(1);
    });

    it("deletes user", async () => {
        await act(async () => {
            await fetch.mockImplementationOnce(() => Promise.resolve(data));
            render(<Router><AccountEdit /></Router>);
        });

        await fetch.mockImplementationOnce(() => Promise.resolve(deleted_data));

        const deleteButton = screen.getByTestId("delete");
        fireEvent.click(deleteButton);

        const headers = new Headers();
        headers.set('Authorization', `Basic ${btoa('alex123:12345')}`);
        headers.set('content-type', 'application/json');

        await expect(fetch).toHaveBeenCalledWith("http://localhost:8089/api/v1/user/alex123", {
            method: 'DELETE',
            headers,
        });
        await expect(fetch)
            .toHaveBeenCalledTimes(2);
    });
});
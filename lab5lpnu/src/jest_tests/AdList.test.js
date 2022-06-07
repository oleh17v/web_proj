import React from 'react';
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import {BrowserRouter as Router} from "react-router-dom";
import AdList from "../Components/AdList";

describe("AdList component", () => {
    it("renders list of ads", () => {
        render (<Router><AdList
            ads={[
                {
                    text: 'BUY SMTH',
                    DataOfPublishing: "2022-05-19 9:53:00",
                    status: 'open',
                    idLocation: '1',
                    idCategory: '1',
                    idUser: '1'
                },
                {
                    text: 'BUY SMTH',
                    DataOfPublishing: "2022-05-19 9:53:00",
                    status: 'open',
                    idLocation: '1',
                    idCategory: '1',
                    idUser: '1'
                },
                {
                    text: 'BUY SMTH',
                    DataOfPublishing: "2022-05-19 9:53:00",
                    status: 'close',
                    idLocation: '1',
                    idCategory: '1',
                    idUser: '1'
                }
            ]}
        /></Router>);
        expect(screen.getAllByRole("link")).toHaveLength(3);
    });
});
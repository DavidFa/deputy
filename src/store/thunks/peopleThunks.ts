import { createAsyncThunk } from "@reduxjs/toolkit";
import { URL } from '../../api/helper';
import { MyKnownError, PeopleType } from "../../models/Types";

// Fetch data when People component render initially
// Get all data at once because backend api doesn't support pagenation
export const fetchPeople = createAsyncThunk<PeopleType[], number, { rejectValue: MyKnownError }>('people/getPeople',
    async (_: number, { rejectWithValue }) => {
        const response = await fetch(`${URL}people.json`);
        if (!response.ok) {
            // Return the known error for future handling
            return rejectWithValue({ errorMessage: "error" } as MyKnownError)
        }
        const data = await response.json();

        const people: PeopleType[] = []
        for (let key in data) {
            people.push(data[key] as PeopleType);
        }
        return people;
    })
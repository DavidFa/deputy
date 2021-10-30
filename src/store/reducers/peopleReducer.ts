import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PeopleType } from "../../models/Types";
import { fetchPeople } from "../thunks/peopleThunks";

interface initialStateType {
    people: PeopleType[];
    isLoading: boolean;
    errorMessage: string;
    isInitial: boolean;
}

const initialState: initialStateType = {
    people: [],
    isLoading: false,
    errorMessage: '',
    isInitial: true
};

const peopleSlice = createSlice({
    name: "People",
    initialState,
    reducers: {
        update: (state: initialStateType, action: PayloadAction<PeopleType>) => {
            const index = state.people.findIndex(person => {
                return person.id === action.payload?.id;
            });
            if (index !== -1) {
                state.people.splice(index, 1, action.payload);
            }
            return state;
        }
    },
    extraReducers: {
        [fetchPeople.pending.type]: (state: initialStateType) => {
            state.isLoading = true
        },
        [fetchPeople.fulfilled.type]: (state: initialStateType, { payload }) => {
            state.people = payload;
            state.isLoading = false;
            state.isInitial = false;
        },
        [fetchPeople.rejected.type]: (state: initialStateType, { payload }) => {
            state.isLoading = false;
            state.errorMessage = payload;
        },
    }
});

export const actions = peopleSlice.actions;
export default peopleSlice.reducer;
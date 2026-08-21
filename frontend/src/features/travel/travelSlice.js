import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    entities: [],
    selectedCountries: [],
    selectedEntities: []
};

const travelSlice = createSlice({
    name: 'travel',
    initialState,
    reducers: {
        addTravel: (state, action) => {
            state.entities.push(action.payload);
        },

        deleteTravel: (state, action) => {
            state.entities = state.entities.filter(
                (travel) => travel.travelID !== action.payload
            );
            state.selectedEntities = state.selectedEntities.filter(
                (travelID) => travelID !== action.payload
            );
        },

        deleteSelectedTravels: (state) => {
            state.entities = state.entities.filter((travel) => !state.selectedEntities.includes(travel.travelID));
            state.selectedEntities = [];
        },

        toggleCountry: (state, action) => {
            const country = action.payload;

            if (state.selectedCountries.includes(country)) {
                state.selectedCountries = state.selectedCountries.filter(
                    (selectedCountry) => selectedCountry !== country
                );
            } else {
                state.selectedCountries.push(country);
            }
        },

        toggleSelectedEntity: (state, action) => {
            const travelID = action.payload;

            if (state.selectedEntities.includes(travelID)) {
                state.selectedEntities = state.selectedEntities.filter((selectedTravelID) => selectedTravelID !== travelID);
            } else {
                state.selectedEntities.push(travelID);
            }
        },

        updateTravel: (state, action) => {
            const index = state.entities.findIndex(
                (travel) => travel.travelID === action.payload.travelID
            );

            if (index !== -1) {
                state.entities[index] = action.payload;
            }
        },

        setTravels: (state, action) => {
            state.entities = action.payload;
        },
    },
});

export const { addTravel, setTravels, deleteTravel, updateTravel, deleteSelectedTravels, toggleCountry, toggleSelectedEntity } = travelSlice.actions;

export default travelSlice.reducer;
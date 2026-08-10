import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    entities: [
        {
            travelID: 10001,
            title: 'Japan Discovery',
            description: 'Explore the highlights of Tokyo, Kyoto and Osaka.',
            price: 2500,
            country: 'Japan',
            travelPeriod: '7 Days 6 Nights',
            imageURL: '',
        },
        {
            travelID: 10002,
            title: 'Korea Adventure',
            description: 'Discover the best attractions in Seoul and Busan.',
            price: 1800,
            country: 'South Korea',
            travelPeriod: '5 Days 4 Nights',
            imageURL: '',
        },
        {
            travelID: 10003,
            title: 'Thailand Escape',
            description: 'Enjoy the vibrant city of Bangkok and beautiful Phuket.',
            price: 1200,
            country: 'Thailand',
            travelPeriod: '5 Days 4 Nights',
            imageURL: '',
        },
        {
            travelID: 10004,
            title: 'Taiwan Explorer',
            description: 'Experience the food, culture and scenery of Taiwan.',
            price: 1500,
            country: 'Taiwan',
            travelPeriod: '6 Days 5 Nights',
            imageURL: '',
        },
        {
            travelID: 10005,
            title: 'Australia Getaway',
            description: 'Visit the famous sights and attractions of Sydney.',
            price: 2800,
            country: 'Australia',
            travelPeriod: '7 Days 6 Nights',
            imageURL: '',
        },
        {
            travelID: 10006,
            title: 'Vietnam Experience',
            description: 'Explore the culture and scenery of Hanoi and Ha Long Bay.',
            price: 1300,
            country: 'Vietnam',
            travelPeriod: '5 Days 4 Nights',
            imageURL: '',
        },
    ],

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
    },
});

export const { addTravel, deleteTravel, updateTravel, deleteSelectedTravels, toggleCountry, toggleSelectedEntity } = travelSlice.actions;

export default travelSlice.reducer;
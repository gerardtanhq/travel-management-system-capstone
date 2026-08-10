import { createSlice } from '@reduxjs/toolkit';
import chickenRice from '../../images/Chicken Rice.jpg';
import coffee from '../../images/Coffee.jpg';
import icedLemonTea from '../../images/Iced Lemon Tea.jpg';
import laksa from '../../images/Laksa.jpg';
import mangoPudding from '../../images/Mango Pudding.jpg';
import tiramisu from '../../images/Tiramisu.jpg';

const initialState = {
    entities: [
        {
            id: 'A1B2C3D4E5',
            name: 'Chicken Rice',
            category: 'Main',
            price: 4.5,
            description: 'Tender chicken served with fragrant rice and chilli sauce.',
            image: chickenRice,
        },
        {
            id: 'F6G7H8I9J0',
            name: 'Iced Lemon Tea',
            category: 'Drink',
            price: 1.8,
            description: 'A refreshing iced tea flavoured with fresh lemon.',
            image: icedLemonTea,
        },
        {
            id: 'A322M3GHZ5',
            name: 'Tiramisu',
            category: 'Dessert',
            price: 2.5,
            description: 'A creamy coffee-flavoured dessert with layers of mascarpone.',
            image: tiramisu,
        },
        {
            id: 'VD3JM3JJ27',
            name: 'Coffee',
            category: 'Drink',
            price: 2.2,
            description: 'Freshly brewed coffee with a rich and aromatic flavour.',
            image: coffee,
        },
        {
            id: 'AU20NJI890',
            name: 'Mango Pudding',
            category: 'Dessert',
            price: 3.2,
            description: 'A smooth and chilled pudding made with sweet mango.',
            image: mangoPudding,
        },
        {
            id: 'K1L2M3N4O5',
            name: 'Laksa',
            category: 'Main',
            price: 4.3,
            description: 'Rice noodles served in a spicy and creamy coconut broth.',
            image: laksa,
        },
    ],

    selectedCategories: [],
    selectedEntities: []
};

const foodsSlice = createSlice({
    name: 'foods',
    initialState,
    reducers: {
        addFood: (state, action) => {
            state.entities.push(action.payload);
        },

        deleteFood: (state, action) => {
            state.entities = state.entities.filter(
                (food) => food.id !== action.payload
        );
            state.selectedEntities = state.selectedEntities.filter(
                (id) => id !== action.payload
            );
        },

        deleteSelectedFoods: (state) => {
            state.entities = state.entities.filter((food) => !state.selectedEntities.includes(food.id));
            state.selectedEntities = [];
        },

        toggleCategory: (state, action) => {
            const category = action.payload;

            if (state.selectedCategories.includes(category)) {
                state.selectedCategories = state.selectedCategories.filter(
                    (selectedCategory) => selectedCategory !== category
                );
            } else {
                state.selectedCategories.push(category);
            }
        },

        toggleSelectedEntity: (state, action) => {
            const id = action.payload;

            if (state.selectedEntities.includes(id)) {
                state.selectedEntities = state.selectedEntities.filter((selectedId) => selectedId !== id);
            } else {
                state.selectedEntities.push(id);
            }
        },
    },
});

export const { addFood, deleteFood, deleteSelectedFoods, toggleCategory, toggleSelectedEntity } = foodsSlice.actions;

export default foodsSlice.reducer;
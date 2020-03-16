import { configureStore } from '@reduxjs/toolkit';
import items from './ducks/items';

const store = configureStore({
	reducer: {
		items,
	},
});

export default store;

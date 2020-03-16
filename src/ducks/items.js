import { createSlice, createSelector } from '@reduxjs/toolkit';
import firebase from 'firebase';
import { config, keyDataBase } from '../config/firebaseDatabase';

const slice = createSlice({
	name: 'items',
	initialState: {
		released_last_week_prod: {},
		released_this_week_prod: {},
		released_last_week_test: {},
		toBe_released_next_two_weeks_prod: {},
		toBe_released_next_week_test: {},
		toBe_released_next_two_weeks_test: {},
		studies: {},
		last: {},
	},
	reducers: {
		setInitData: (state, { payload }) => {
			keyDataBase.forEach(elem => {
				state[elem] = payload[elem];
			});
		},

		addCard: (state, { payload }) => {
			if (!!state[payload.where]) {
				state[payload.where][payload.newKey] = payload.what;
			} else {
				state[payload.where] = {};
				state[payload.where][payload.newKey] = payload.what;
			}
			state.last.where = payload.where;
			state.last.what = payload.what;
			state.last.type = 'add';
		},

		removeCard: (state, { payload }) => {
			delete state[payload.where][payload.what];
			state.last.where = payload.where;
			state.last.what = payload.content;
			state.last.type = 'remove';
		},

		editCard: (state, { payload }) => {
			state[payload.where][payload.what] = payload.content;
			state.last.where = payload.where;
			state.last.what = payload.content;
			state.last.type = 'edit';
		},

		moveCard: (state, { payload }) => {
			delete state[payload.elemToMove.where][payload.elemToMove.key];
			if (!state[payload.moveTo]) {
				state[payload.moveTo] = {};
			}
			state[payload.moveTo][payload.elemToMove.key] = {};
			state[payload.moveTo][payload.elemToMove.key] = payload.elemToMove.name;
			state.last.where = payload.moveTo;
			state.last.what = payload.elemToMove;
			state.last.type = 'move';
		},
	},
});

const { reducer, actions } = slice;
let app = {};
let database = {};

// Side Effect
export const getInitialData = () => dispatch => {
	app = firebase.initializeApp(config);
	database = firebase.database();
	let result = {};
	keyDataBase.forEach((elem, key) => {
		database
			.ref(elem)
			.once('value')
			.then(snapshot => {
				result[elem] = {};
				result[elem] = snapshot.val();
				if (key === keyDataBase.length - 1) {
					dispatch(setInitData(result));
				}
			});
	});
};

export const writeThings = (where, what) => dispatch => {
	var newKey = database
		.ref()
		.child(where)
		.push().key;
	var update = {};
	update[where + '/' + newKey] = what;
	database
		.ref()
		.update(update)
		.then(rsp => {
			dispatch(addCard({ where, what, newKey }));
		});
};

export const deleteThings = (where, what, content) => dispatch => {
	database
		.ref(where + '/' + what)
		.remove()
		.then(rsp => {
			dispatch(removeCard({ where, what, content }));
		});
};

export const editThings = (where, what, content) => dispatch => {
	const update = {};
	update[where + '/' + what] = content;
	database
		.ref()
		.update(update)
		.then(rsp => {
			dispatch(editCard({ where, what, content }));
		});
};

export const moveThings = (elemToMove, moveTo) => dispatch => {
	/* On commence par delete */
	database
		.ref(elemToMove.where + '/' + elemToMove.key)
		.remove()
		.then(rsp => {
			/* On créer dans le nouveau truc */
			var update = {};
			update[moveTo + '/' + elemToMove.key] = elemToMove.name;
			database
				.ref()
				.update(update)
				.then(rsp => {
					dispatch(moveCard({ elemToMove, moveTo }));
				});
		});
};

// selectors
const getSlice = state => state.items;

export const getReleasedThisWeekProd = createSelector(
	[getSlice],
	data => data.released_this_week_prod
);

export const getReleasedLastWeekProd = createSelector(
	[getSlice],
	data => data.released_last_week_prod
);

export const getReleasedLastWeekTest = createSelector(
	[getSlice],
	data => data.released_last_week_test
);

export const getToBeReleasedNextTwoWeeksProd = createSelector(
	[getSlice],
	data => data.toBe_released_next_two_weeks_prod
);

export const getToBeReleasedNextWeekTest = createSelector(
	[getSlice],
	data => data.toBe_released_next_week_test
);
export const getToBeReleasedNextTwoWeeksTest = createSelector(
	[getSlice],
	data => data.toBe_released_next_two_weeks_test
);

export const getAll = createSelector([getSlice], data => data);

export const getStudies = createSelector([getSlice], data => data.studies);

export const getLastAction = createSelector([getSlice], data => data.last);

export const { setInitData, addCard, removeCard, editCard, moveCard } = actions;

export default reducer;

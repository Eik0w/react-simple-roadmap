import store from './store';
import { Provider } from 'react-redux';
import React from 'react';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import theme from './theme';
import BulletinRd from './components/BulletinRD';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import { makeStyles } from '@material-ui/styles';
import pattern from './assets/dust_scratches.png';

const useStyles = makeStyles(theme => ({
	'@global': {
		body: {
			background: `url(${pattern})`,
			padding: 0,
			margin: 0,
			'& *': {
				boxSizing: 'border-box',
			},
		},
		'.tox-notification--warning': {
			display: 'none',
		},
	},
}));

function App() {
	const classes = useStyles();
	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<DndProvider backend={Backend}>
					<BulletinRd></BulletinRd>
				</DndProvider>
			</ThemeProvider>
		</Provider>
	);
}

export default App;

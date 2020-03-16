import React, { useRef, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import { Cancel } from '@material-ui/icons';
import { writeThings } from '../ducks/items';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles(
	theme => ({
		root: {},
		container: {
			paddingTop: '5px',
			borderRadius: '0 0 10px 10px',
			background: '#e3e3e3',
		},
		input: {
			width: '100%',
			borderRadius: 0,
			background: '#fff',
		},
		actionContainer: {
			padding: '5px 5px 10px 5px',
			display: 'flex',
			flexWrap: 'wrap',
			justifyContent: 'space-between',
		},
		inputContainer: {
			padding: '5px',
		},
		btn: {
			flex: '0 0 49%',
			color: 'white',
		},
		btnCancel: {
			flex: '1 0 auto',
			justifySelf: 'center',
		},
	}),
	{ name: 'FormAddTing' }
);

function FormAddTing(props) {
	const { className } = props;
	const classes = useStyles(props);
	const [textCard, setTextCard] = useState('');
	const dispatch = useDispatch();
	const handleClickCancel = () => {
		props.resetAdd(false);
	};

	const handlerInputChange = e => {
		setTextCard(e.currentTarget.value);
	};

	const handleClickWrite = () => {
		if (textCard.length) {
			dispatch(writeThings(props.type, textCard));
			props.resetAdd(false);
		}
	};

	const handlerKeyPress = e => {
		if (e.key === 'Enter') handleClickWrite();
	};

	return (
		<div className={classes.container}>
			<div className={classes.inputContainer}>
				<TextField
					label="Your new task"
					type="search"
					variant="outlined"
					onChange={handlerInputChange}
					onKeyPress={handlerKeyPress}
					className={classes.input}
				/>
			</div>
			<div className={classes.actionContainer}>
				<Button
					variant={'contained'}
					color="secondary"
					onClick={handleClickCancel}
					className={classes.btn}
				>
					Cancel
				</Button>
				<Button
					variant={'contained'}
					color={'primary'}
					className={classes.btn}
					onClick={handleClickWrite}
				>
					Add Task
				</Button>
			</div>
		</div>
	);
}

export default FormAddTing;

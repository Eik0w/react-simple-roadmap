import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import { editThings } from '../ducks/items';

const useStyles = makeStyles(
	theme => ({
		root: {},
		btn: {
			width: '100%',
			marginTop: 10,
		},
	}),
	{ name: 'EditThings' }
);

function EditThings(props) {
	const { className } = props;
	const dispatch = useDispatch();
	const classes = useStyles(props);
	const [editFields, setEditFields] = useState(props.text);

	const handleClickEdit = () => {
		if (editFields.length) {
			dispatch(editThings(props.type, props.textKey, editFields));
			props.edit(false);
		} else {
			//Error
		}
	};

	const handlerInputChange = e => {
		setEditFields(e.currentTarget.value);
	};

	const handleInputPress = e => {
		if (e.key === 'Enter') handleClickEdit();
	};

	return (
		<>
			<TextField
				label="Edit yout task"
				type="search"
				variant="outlined"
				defaultValue={props.text}
				onChange={handlerInputChange}
				className={classes.input}
				onKeyPress={handleInputPress}
			/>
			<Button
				variant={'contained'}
				color={'primary'}
				className={classes.btn}
				onClick={handleClickEdit}
			>
				Confirm
			</Button>
		</>
	);
}

export default EditThings;

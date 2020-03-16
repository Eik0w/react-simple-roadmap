import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { AddCircle } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import FormAddTing from './FormAddTing';

const useStyles = makeStyles(
	theme => ({
		root: {},
		adding: {
			display: 'flex',
			alignItems: 'center',
			height: '40px',
			fontSize: '12px',
			color: 'white',
			padding: '5px',
			cursor: 'pointer',
			borderRadius: '0 0 5px 5px',
		},
		text: {
			marginLeft: '10px',
		},
	}),
	{ name: 'AddThing' }
);

function AddThing(props) {
	const { className } = props;
	const classes = useStyles(props);
	const [isAdd, setIsAdd] = useState(false);

	const handleClickAdd = () => {
		setIsAdd(true);
	};

	return (
		<>
			{!isAdd ? (
				<Typography
					variant="button"
					className={classes.adding}
					onClick={handleClickAdd}
				>
					<AddCircle /> <span className={classes.text}> Add new card </span>
				</Typography>
			) : (
				<FormAddTing type={props.type} resetAdd={setIsAdd} />
			)}
		</>
	);
}

export default AddThing;

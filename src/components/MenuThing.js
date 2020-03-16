import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { Cancel, Delete, Edit, MoreVert } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import { deleteThings } from '../ducks/items';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles(
	theme => ({
		root: {},
		menuContainer: {
			position: 'absolute',
			top: 0,
			right: 0,
			bottom: 0,
		},
	}),
	{ name: 'MenuThing' }
);

function MenuThing(props) {
	const { className } = props;
	const dispatch = useDispatch();
	const classes = useStyles(props);
	const [open, setOpen] = useState(false);
	const [anchor, setAnchor] = useState({});

	const handleClick = e => {
		setOpen(true);
		setAnchor(e.currentTarget);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleDelete = () => {
		dispatch(deleteThings(props.type, props.textKey, props.text));
		setOpen(false);
	};

	const handleEdit = () => {
		props.edit(true);
	};

	return (
		<div className={classes.menuContainer}>
			<IconButton
				aria-label="more"
				aria-controls="long-menu"
				aria-haspopup="true"
				onClick={handleClick}
			>
				<MoreVert />
			</IconButton>
			<Menu
				id="long-menu"
				keepMounted
				open={open}
				onClose={handleClose}
				anchorEl={anchor}
				TransitionComponent={Fade}
			>
				<MenuItem key="edit" onClick={handleEdit}>
					<ListItemIcon>
						<Edit fontSize="small" />
					</ListItemIcon>
					<Typography variant="inherit">Edit task</Typography>
				</MenuItem>
				<MenuItem key="delete" onClick={handleDelete}>
					<ListItemIcon>
						<Delete fontSize="small" />
					</ListItemIcon>
					<Typography variant="inherit">Delete task</Typography>
				</MenuItem>
				<MenuItem key="cancel" onClick={handleClose}>
					<ListItemIcon>
						<Cancel fontSize="small" />
					</ListItemIcon>
					<Typography variant="inherit">Cancel</Typography>
				</MenuItem>
			</Menu>
		</div>
	);
}

export default MenuThing;

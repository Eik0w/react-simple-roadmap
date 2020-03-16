import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import ListItem from '@material-ui/core/ListItem';
import { ListItemIcon } from '@material-ui/core';
import { PlayArrow, Send } from '@material-ui/icons';
import ListItemText from '@material-ui/core/ListItemText';
import { useDrag } from 'react-dnd';
import Typography from '@material-ui/core/Typography';
import MenuThing from './MenuThing';
import EditThings from './EditThings';

const useStyles = makeStyles(
	theme => ({
		root: {},
		oneThing: {
			padding: '10px',
			borderBottom: '1px solid #e3e3e3',
			borderLeft: '1px solid #e3e3e3',
			borderRight: '1px solid #e3e3e3',
			color: '#484848',
			background: '#fff',
			lineHeight: '1.75',
			position: 'relative',
		},
		oneThingDrag: {
			padding: '10px',
			opacity: 0.9,
			borderBottom: '1px solid #e3e3e3',
			borderLeft: '1px solid #e3e3e3',
			borderRight: '1px solid #e3e3e3',
			color: '#484848',
			background: '#fff',
			lineHeight: '1.75',
			position: 'relative',
		},
		menu: {
			position: 'absolute',
			top: 0,
			right: 0,
			bottom: 0,
			width: '100px',
		},
	}),
	{ name: 'DragableThing' }
);

function DragableThing(props) {
	const { className } = props;
	const classes = useStyles(props);
	const [isHover, setIsHover] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [{ isDragging }, drag] = useDrag({
		item: {
			type: 'something',
			name: props.text,
			where: props.type,
			key: props.textKey,
		},
		collect: monitor => ({
			isDragging: !!monitor.isDragging(),
		}),
	});

	var dragClass = clsx({
		[classes.oneThing]: !isDragging,
		[classes.oneThingDrag]: isDragging,
	});

	const handlerMouseEnter = () => {
		setIsHover(true);
	};

	const handlerMouseLeave = () => {
		setIsHover(false);
	};

	return (
		<div
			className={dragClass}
			ref={drag}
			onMouseEnter={handlerMouseEnter}
			onMouseLeave={handlerMouseLeave}
		>
			{!isEdit ? (
				<Typography variant="subtitle1">{props.text}</Typography>
			) : (
				<EditThings
					type={props.type}
					text={props.text}
					textKey={props.textKey}
					edit={setIsEdit}
				/>
			)}
			{isHover && !isEdit && (
				<MenuThing
					className={classes.menu}
					key={props.texKey}
					textKey={props.textKey}
					type={props.type}
					text={props.text}
					edit={setIsEdit}
				/>
			)}
		</div>
	);
}

export default DragableThing;

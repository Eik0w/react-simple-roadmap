import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useDrag, useDrop } from 'react-dnd';
import clsx from 'clsx';
import { keyDataBaseDisplay } from '../config/firebaseDatabase';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import { useDispatch, useSelector } from 'react-redux';
import {
	getReleasedLastWeekProd,
	getReleasedLastWeekTest,
	getReleasedThisWeekProd,
	getStudies,
	getToBeReleasedNextTwoWeeksProd,
	getToBeReleasedNextTwoWeeksTest,
	getToBeReleasedNextWeekTest,
	moveThings,
} from '../ducks/items';
import DragableThing from './DragableThing';
import Typography from '@material-ui/core/Typography';
import AddThing from './AddThing';

const useStyles = makeStyles(
	theme => ({
		root: {},
		listContainer: {
			flex: '0 1 13.28%',
			margin: '0.5%',
			background: '#3A5576',
			borderRadius: '10px',
			position: 'relative',
			zIndex: 500,
		},
		isOverAndDropable: {
			position: 'relative',
			zIndex: 500,
			border: '1px solid #04BFAD',
			'&:after': {
				display: 'block',
				content: '" "',
				position: 'relative',
				width: '100%',
				height: '50px',
				background: '#04BFAD',
			},
		},
		isDropableNotOver: {
			position: 'relative',
			zIndex: 500,
			'&:after': {
				display: 'block',
				content: '" "',
				position: 'relative',
				width: '100%',
				height: '50px',
				background: '#F9B755',
			},
		},
		titleContainer: {
			width: '100%',
			padding: '10px',
			position: 'relative',
		},
		nbThings: {
			position: 'absolute',
			right: '-8px',
			top: '-8px',
			padding: '5px',
			textAlign: 'center',
			fontFamily: 'Arial',
			fontWeight: 'bold',
			width: '25px',
			height: '25px',
			borderRadius: '100%',
			background: 'rgb(255,95,97)',
			color: 'white',
		},
		title: {
			fontSize: '12px',
			color: '#fff',
		},
		isNotOver: {},
	}),
	{ name: 'RoadMapPart' }
);

function RoadMapPart(props) {
	const { className } = props;
	const classes = useStyles(props);
	const dispatch = useDispatch();

	const query = {
		released_last_week_prod: useSelector(getReleasedLastWeekProd),
		released_this_week_prod: useSelector(getReleasedThisWeekProd),
		released_last_week_test: useSelector(getReleasedLastWeekTest),
		toBe_released_next_two_weeks_prod: useSelector(
			getToBeReleasedNextTwoWeeksProd
		),
		toBe_released_next_week_test: useSelector(getToBeReleasedNextWeekTest),
		toBe_released_next_two_weeks_test: useSelector(
			getToBeReleasedNextTwoWeeksTest
		),
		studies: useSelector(getStudies),
	};

	const resultPart = query[props.type];
	//[props.type]();
	const [{ isOver, canDrop }, drop] = useDrop({
		accept: 'something',
		drop: (...args) => {
			const elemToMove = args[0];
			const moveTo = args[1].name;
			if (elemToMove.where !== moveTo) dispatch(moveThings(elemToMove, moveTo));
		},
		collect: elem => ({
			isOver: !!elem.isOver(),
			canDrop: !!elem.canDrop(),
			truc: (elem.name = props.type),
		}),
	});

	const isHoverDrop = clsx({
		[classes.isOverAndDropable]: isOver && canDrop,
		[classes.isDropableNotOver]: !isOver && canDrop,
	});

	const isCanDrop = clsx({
		[classes.canDrop]: canDrop,
		[classes.cantDrop]: !canDrop,
	});

	return (
		<>
			<div className={classes.listContainer}>
				<div className={classes.titleContainer}>
					<div className={classes.nbThings}>
						{resultPart ? Object.keys(resultPart).length : 0}
					</div>
					<Typography variant="button" className={classes.title}>
						{keyDataBaseDisplay[props.type]}
					</Typography>
				</div>
				<div className={isHoverDrop} ref={drop}>
					{resultPart &&
						Object.keys(resultPart).map((elem, key) => {
							return (
								<DragableThing
									key={key}
									text={resultPart[elem]}
									textKey={elem}
									type={props.type}
								/>
							);
						})}
				</div>
				<AddThing type={props.type} />
			</div>
		</>
	);
}

export default RoadMapPart;

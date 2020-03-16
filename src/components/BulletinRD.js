import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import useTabData from './useTabData';
import { useDispatch, useSelector } from 'react-redux';
import { keyDataBase } from '../config/firebaseDatabase';
import RoadMapPart from './RoadMapPart';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { Close, Explore, ListAlt } from '@material-ui/icons';
import Snackbar from '@material-ui/core/Snackbar';
import { getInitialData, getLastAction } from '../ducks/items';
import ExportText from './ExportText';
import Modal from '@material-ui/core/Modal';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(
	theme => ({
		root: {},
		partContainer: {
			flex: '0 1 14.28%',
		},
		myContainer: {
			display: 'flex',
			flexWrap: 'wrap',
			justifyContent: 'flex-start',
			alignItems: 'flex-start',
			width: '100%',
			color: '#fff',
		},
		right: {
			justifyContent: 'flex-end',
			flex: '1 0 auto',
			textAlign: 'right',
		},
		title: {
			flex: '1 1 100%',
		},
		bar: {
			marginBottom: '20px',
		},
		alertAdd: {
			borderRadius: '5px',
			background: '#4caf50',
			'& *': {
				background: '#4caf50',
			},
		},
		alertRemove: {
			borderRadius: '5px',
			background: '#F9B755',
			'& *': {
				background: '#F9B755',
			},
		},
		alertEdit: {
			borderRadius: '5px',
			background: '#12B2DE',
			'& *': {
				background: '#12B2DE',
			},
		},
		alertMove: {
			borderRadius: '5px',
			background: '#E84879',
			'& *': {
				background: '#E84879',
			},
		},
		popTitle: {
			borderBottom: '1px solid #e3e3e3',
		},
		close: {
			position: 'absolute',
			right: 0,
			top: '-5px',
		},
	}),
	{ name: 'BulletinRd' }
);

function BulletinRd(props) {
	const { className } = props;
	const classes = useStyles(props);
	const dispatch = useDispatch();
	const lastAction = useSelector(getLastAction);
	const [first, setFirst] = useState(true);
	const [open, setOpen] = useState(false);
	const [alertType, setAlertType] = useState(false);
	const [openExport, setOpenExport] = useState(false);
	const [isCopied, setIsCopied] = useState(false);
	const [alert, setAlert] = useState({
		message: '',
		type: '',
	});

	/* On récupère les infos de la base de donnée */
	useEffect(() => {
		dispatch(getInitialData());
	}, []);

	useEffect(() => {
		if (isCopied === true) {
			setAlert({
				message: 'Copied to clipboard successfully',
			});
			setAlertType('add');
			setOpen(true);
			setIsCopied(false);
		}
	}, [isCopied]);

	/* Watcher dès qu'il y a un changement */
	useEffect(() => {
		if (first) {
			setFirst(false);
		} else {
			let message = '';
			let laclass = '';
			switch (lastAction.type) {
				case 'add':
					message = `${lastAction.what} successfully added to ${lastAction.where}`;
					setAlertType('add');
					break;
				case 'remove':
					message = `${lastAction.what} successfully removed to ${lastAction.where}`;
					setAlertType('remove');
					break;
				case 'edit':
					message = `${lastAction.what} successfully edited to ${lastAction.where}`;
					setAlertType('edit');
					break;
				case 'move':
					message = `${lastAction.what.name} successfully moved to ${lastAction.where}`;
					setAlertType('move');
					break;
			}
			setAlert({
				message,
			});
			setOpen(true);
		}
	}, [lastAction]);

	const classeAlert = clsx({
		[classes.alertAdd]: alertType === 'add',
		[classes.alertRemove]: alertType === 'remove',
		[classes.alertEdit]: alertType === 'edit',
		[classes.alertMove]: alertType === 'move',
	});

	const handleExportClick = () => {
		setOpenExport(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleModalClose = () => {
		setOpenExport(false);
	};

	return (
		<>
			<div className={classes.myContainer}>
				<AppBar position="static" className={classes.bar}>
					<Toolbar>
						<IconButton edge={'start'} color="inherit">
							<Explore />
						</IconButton>
						<Typography variant="h6" color="inherit">
							Road Map Frontend
						</Typography>
						<div className={classes.right}>
							<IconButton
								edge={'end'}
								color={'inherit'}
								onClick={handleExportClick}
								aria-label={'Export to text'}
							>
								<ListAlt />
							</IconButton>
						</div>
					</Toolbar>
				</AppBar>
				{keyDataBase.map((elem, key) => {
					return (
						<RoadMapPart className={classes.roadPart} key={key} type={elem} />
					);
				})}
				<Snackbar
					anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
					open={open}
					onClose={handleClose}
					autoHideDuration={1500}
					message={alert.message}
					className={classeAlert}
				/>
			</div>
			<Dialog
				open={openExport}
				className={classes.pop}
				onClose={handleModalClose}
				maxWidth={'md'}
				fullWidth={true}
			>
				<DialogTitle>
					<IconButton onClick={handleModalClose} className={classes.close}>
						<Close />
					</IconButton>
				</DialogTitle>
				<ExportText copied={setIsCopied} />
			</Dialog>
		</>
	);
}

export default BulletinRd;

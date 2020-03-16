import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { getAll } from '../ducks/items';
import { keyDataBase, keyDataBaseDisplay } from '../config/firebaseDatabase';
import RoadMapPart from './RoadMapPart';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { Typography } from '@material-ui/core';
import { Editor } from '@tinymce/tinymce-react';

const useStyles = makeStyles(
	theme => ({
		root: {},
		editor: {
			'& .tox-notification--warning': {
				display: 'none',
			},
		},
		popAction: {
			borderTop: '1px solid #e3e3e3',
		},
	}),
	{ name: 'ExportText' }
);

function ExportText(props) {
	const { className } = props;
	const classes = useStyles(props);
	const myData = useSelector(getAll);
	const [myRoadMap, setMyRoadMap] = useState('');
	const myExport = useRef();
	const editor = useRef();
	let tmpText = '';
	useEffect(() => {
		Object.keys(myData).map((elem, key) => {
			if (keyDataBaseDisplay[elem])
				tmpText += `<h4 style="color:#3A5576"><b>${keyDataBaseDisplay[elem]}</b></h4>`;
			tmpText += `<ul>`;
			if (keyDataBaseDisplay[elem] && myData[elem]) {
				Object.keys(myData[elem]).map((_elem, _key) => {
					tmpText += `<li><span> ${myData[elem][_elem]} </span></li>`;
				});
				tmpText += `</ul>`;
			}
		});
		setMyRoadMap(tmpText.toString());
	}, [myData]);

	const handleCopyClick = () => {
		window.tinymce.activeEditor.execCommand('SelectAll');
		window.tinymce.activeEditor.execCommand('Copy');
		props.copied(true);
	};

	return (
		<>
			<DialogContent ref={myExport} className={classes.pop}>
				<Editor
					apiKey={'08d8xg0508uz5thiir8zphehcli6c4rl8al79bc8pzbyelf8'}
					className={classes.editor}
					ref={editor}
					initialValue={myRoadMap}
					init={{
						selector: 'textarea', // change this value according to your HTML
						menubar: false,
						toolbar: false,
						statusbar: false,
						height: '80vh',
					}}
				/>
			</DialogContent>
			<DialogActions className={classes.popAction}>
				<Button
					variant={'contained'}
					color={'primary'}
					className={classes.btn}
					onClick={handleCopyClick}
				>
					Copy To Clipboard
				</Button>
			</DialogActions>
		</>
	);
}

/*
	Object.keys(resultPart).map((elem, key) => {
							return (
								<DragableThing
									key={key}
									text={resultPart[elem]}
									textKey={elem}
									type={props.type}
								/>
 */

export default ExportText;

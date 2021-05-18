import React, { useState } from "react";
import { dbService, storageService } from "../fbase";

const Spit = ({ spitObj, isOwner }) => {
	const [editing, setEditing] = useState(false);
	const [newSpit, setNewSpit] = useState(spitObj.text);
	const onDeleteClick = async () => {
		const ok = window.confirm("Are you sure?");
		if (ok) {
			await dbService.doc(`spits/${spitObj.id}`).delete();
			await storageService.refFromURL(spitObj.attachmentURL).delete();
		}
	};
	const toggleEditing = () => setEditing((prev) => !prev);
	const onChange = (e) => {
		const { value } = e.target;
		setNewSpit(value);
	};
	const onSubmit = (e) => {
		e.preventDefault();
		dbService.doc(`spits/${spitObj.id}`).update({
			text: newSpit,
		});
		setEditing(false);
	};
	return (
		<div key={spitObj.id}>
			{editing ? (
				<>
					<form onSubmit={onSubmit}>
						<input
							value={newSpit}
							type="text"
							required
							placeholder="Edit your spit"
							onChange={onChange}
						/>
						<input type="submit" value="Update Spit" />
					</form>
					<button onClick={toggleEditing}>Cancel</button>
				</>
			) : (
				<>
					<h4>{spitObj.text}</h4>
					{spitObj.attachmentURL && (
						<img
							src={spitObj.attachmentURL}
							width="80px"
							height="100px"
							alt="attachment"
						/>
					)}
					{isOwner && (
						<>
							<button onClick={onDeleteClick}>Delete Spit</button>
							<button onClick={toggleEditing}>Edit Spit</button>
						</>
					)}
				</>
			)}
		</div>
	);
};

export default Spit;

import React, { useState } from "react";
import { dbService, storageService } from "../fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
		<div className="spit" key={spitObj.id}>
			{editing ? (
				<>
					<form onSubmit={onSubmit} className="container spitEdit">
						<input
							value={newSpit}
							type="text"
							required
							autoFocus
							placeholder="Edit your spit"
							onChange={onChange}
							className="formInput"
						/>
						<input type="submit" value="Update Spit" className="formBtn" />
					</form>
					<span onClick={toggleEditing} className="formBtn cancelBtn">
						Cancel
					</span>
				</>
			) : (
				<>
					<h4>{spitObj.text}</h4>
					{spitObj.attachmentURL && <img alt="" src={spitObj.attachmentURL} />}
					{isOwner && (
						<div className="spit__actions">
							<span onClick={onDeleteClick}>
								<FontAwesomeIcon icon={faTrash} />
							</span>
							<span onClick={toggleEditing}>
								<FontAwesomeIcon icon={faPencilAlt} />
							</span>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default Spit;

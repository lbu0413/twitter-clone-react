import React, { useState } from "react";
import Spit from "./Spit";
import { dbService, storageService } from "../fbase";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const SpitFactory = ({ userObj }) => {
	const [spit, setSpit] = useState("");
	const [attachment, setAttachment] = useState("");

	const onSubmit = async (e) => {
		if (spit === "") {
			return;
		}
		e.preventDefault();
		let attachmentURL = "";
		if (attachment !== "") {
			const attachmentRef = storageService
				.ref()
				.child(`${userObj.uid}/${uuidv4()}`);
			const response = await attachmentRef.putString(attachment, "data_url");
			attachmentURL = await response.ref.getDownloadURL();
		}
		const spitObj = {
			text: spit,
			createdAt: Date.now(),
			creatorId: userObj.uid,
			attachmentURL,
		};
		await dbService.collection("spits").add(spitObj);
		setSpit("");
		setAttachment("");
	};

	const onChange = (e) => {
		const { value } = e.target;
		setSpit(value);
	};

	const onFileChange = (e) => {
		const { files } = e.target;
		const file = files[0];
		const reader = new FileReader();
		reader.onloadend = (finishedEvent) => {
			const { result } = finishedEvent.currentTarget;
			setAttachment(result);
		};
		reader.readAsDataURL(file);
	};
	const onClearAttachment = () => setAttachment("");

	return (
		<form onSubmit={onSubmit} className="factoryForm">
			<div className="factoryInput__container">
				<input
					className="factoryInput__input"
					value={spit}
					onChange={onChange}
					type="text"
					placeholder="Spit what's on your mind"
					maxLength={120}
				/>
				<input type="submit" value="&rarr;" className="factoryInput__arrow" />
			</div>
			<label for="attach-file" className="factoryInput__label">
				<span>Add Photos</span>
				<FontAwesomeIcon icon={faPlus} />
			</label>
			<input
				id="attach-file"
				type="file"
				accept="image/*"
				onChange={onFileChange}
				style={{ opacity: 0 }}
			/>
			{attachment && (
				<div className="factoryForm__attachment">
					<img
						src={attachment}
						style={{ backgroundImage: attachment }}
						alt=""
					/>
					<div className="factoryForm__clear" onClick={onClearAttachment}>
						<span>Remove</span>
						<FontAwesomeIcon icon={faTimes} />
					</div>
				</div>
			)}
		</form>
	);
};

export default SpitFactory;

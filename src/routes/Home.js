import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Spit from "../components/Spit";
import { dbService, storageService } from "../fbase";

const Home = ({ userObj }) => {
	const [spit, setSpit] = useState("");
	const [spits, setSpits] = useState([]);
	const [attachment, setAttachment] = useState("");
	const getSpits = async () => {
		const dbSpits = await dbService.collection("spits").get();
		dbSpits.forEach((document) => {
			const spitObject = {
				...document.data(),
				id: document.id,
			};
			setSpits((prev) => [spitObject, ...prev]);
		});
	};

	useEffect(() => {
		dbService.collection("spits").onSnapshot((snapshot) => {
			const spitArray = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			setSpits(spitArray);
		});
	}, []);

	const onSubmit = async (e) => {
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
	const onClearAttachment = () => setAttachment(null);
	return (
		<div>
			<form onSubmit={onSubmit}>
				<input
					value={spit}
					onChange={onChange}
					type="text"
					placeholder="Spit what's on your mind"
					maxLength={120}
				/>
				<input type="file" accept="image/*" onChange={onFileChange} />
				<input type="submit" value="Spit" />
				{attachment && (
					<div>
						<img src={attachment} alt="" width="50px" height="50px" />
						<button onClick={onClearAttachment}>Clear</button>
					</div>
				)}
			</form>
			<div>
				{spits.map((spit) => (
					<Spit
						key={spit.id}
						spitObj={spit}
						isOwner={spit.creatorId === userObj.uid}
					/>
				))}
			</div>
		</div>
	);
};

export default Home;

import React, { useState, useEffect } from "react";
import { dbService } from "../fbase";

const Home = ({ userObj }) => {
	const [spit, setSpit] = useState("");
	const [spits, setSpits] = useState([]);
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
		await dbService.collection("spits").add({
			text: spit,
			createdAt: Date.now(),
			creatorId: userObj.uid,
		});
		setSpit("");
	};

	const onChange = (e) => {
		const { value } = e.target;
		setSpit(value);
	};
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
				<input type="submit" value="Spit" />
			</form>
			<div>
				{spits.map((spit) => (
					<div key={spit.id}>
						<h4>{spit.text}</h4>
					</div>
				))}
			</div>
		</div>
	);
};

export default Home;

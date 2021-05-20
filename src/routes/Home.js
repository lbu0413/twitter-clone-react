import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Spit from "../components/Spit";
import { dbService, storageService } from "../fbase";
import SpitFactory from "../components/SpitFactory";

const Home = ({ userObj }) => {
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

	return (
		<div>
			<SpitFactory userObj={userObj} />
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

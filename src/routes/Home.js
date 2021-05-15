import React, { useState } from "react";
import { dbService } from "../fbase";

const Home = () => {
	const [spit, setSpit] = useState("");
	const onSubmit = async (e) => {
		e.preventDefault();
		await dbService.collection("spits").add({
			spit,
			createdAt: Date.now(),
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
					placeholder="What's on your mind?"
					maxLength={120}
				/>
				<input type="submit" value="Spit" />
			</form>
		</div>
	);
};

export default Home;

import React, { useEffect, useState } from "react";
import { authService, dbService } from "../fbase";
import { useHistory } from "react-router-dom";

const Profile = ({ userObj, refreshUser }) => {
	const history = useHistory();
	const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
	const onLogOutClick = () => {
		authService.signOut();
		history.push("/");
	};
	// const getMySpits = async () => {
	// 	const spits = await dbService
	// 		.collection("spits")
	// 		.where("creatorId", "==", userObj.uid)
	// 		.orderBy("createdAt")
	// 		.get();
	// 	console.log(spits.docs.map((doc) => doc.data()));
	// };
	const onChange = (e) => {
		const { value } = e.target;
		setNewDisplayName(value);
	};
	// useEffect(() => {
	// 	getMySpits();
	// });

	const onSubmit = async (e) => {
		e.preventDefault();
		if (userObj.displayName !== newDisplayName) {
			await userObj.updateProfile({
				displayName: newDisplayName,
			});
			refreshUser();
		}
	};

	return (
		<>
			<form onSubmit={onSubmit}>
				<input onChange={onChange} type="text" placeholder="Display name" />
				<input type="submit" value="Update Profile" />
			</form>
			<button onClick={onLogOutClick}>Sign out</button>
		</>
	);
};

export default Profile;

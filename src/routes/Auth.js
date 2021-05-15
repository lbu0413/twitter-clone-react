import React, { useState } from "react";
import { authService, firebaseInstance } from "../fbase";

const Auth = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [newAccount, setNewAccount] = useState(true);
	const [error, setError] = useState("");

	const onChange = (e) => {
		const { name, value } = e.target;
		if (name === "email") {
			setEmail(value);
		} else if (name === "password") {
			setPassword(value);
		}
	};
	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			let data;
			if (newAccount) {
				data = await authService.createUserWithEmailAndPassword(
					email,
					password
				);
			} else {
				data = await authService.signInWithEmailAndPassword(email, password);
			}
		} catch (error) {
			setError(error.message);
		}
	};

	const toggleAccount = () => {
		return setNewAccount((prev) => !prev);
	};

	const onSocialClick = async (e) => {
		const { name } = e.target;
		let provider;
		if (name === "google") {
			provider = new firebaseInstance.auth.GoogleAuthProvider();
		} else if (name === "gh") {
			provider = new firebaseInstance.auth.GithubAuthProvider();
		}
		const data = await authService.signInWithPopup(provider);
		console.log(data);
	};

	return (
		<div>
			<form action="" onSubmit={onSubmit}>
				<input
					name="email"
					type="text"
					placeholder="email"
					required
					value={email}
					onChange={onChange}
				/>
				<input
					name="password"
					type="password"
					placeholder="password"
					required
					value={password}
					onChange={onChange}
				/>
				<input
					type="submit"
					value={newAccount ? "Create account" : "Sign in"}
				/>
				{error}
			</form>
			<span onClick={toggleAccount}>
				{newAccount ? "Sign in" : "Create account"}
			</span>
			<div>
				<button onClick={onSocialClick} name="google">
					Continue with Google
				</button>
				<button onClick={onSocialClick} name="gh">
					Continue with Github
				</button>
			</div>
		</div>
	);
};

export default Auth;

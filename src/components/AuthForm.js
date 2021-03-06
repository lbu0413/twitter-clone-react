import React, { useState } from "react";
import { authService, firebaseInstance } from "../fbase";

const AuthForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [newAccount, setNewAccount] = useState(true);
	const [error, setError] = useState("");

	const toggleAccount = () => {
		return setNewAccount((prev) => !prev);
	};

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
	return (
		<>
			<form action="" onSubmit={onSubmit} className="container">
				<input
					name="email"
					type="text"
					placeholder="email"
					required
					value={email}
					onChange={onChange}
					className="authInput"
				/>
				<input
					name="password"
					type="password"
					placeholder="password"
					required
					value={password}
					onChange={onChange}
					className="authInput"
				/>
				<input
					type="submit"
					value={newAccount ? "Create account" : "Sign in"}
					className="authInput authSubmit"
				/>
				{error && <span className="authError">{error}</span>}
			</form>
			<span onClick={toggleAccount} className="authSwitch">
				{newAccount ? "Sign in" : "Create account"}
			</span>
		</>
	);
};

export default AuthForm;

import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Navigation = ({ userObj }) => {
	return (
		<nav>
			<ul
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					marginTop: 50,
				}}>
				<li>
					<Link
						to="/"
						style={{
							marginRight: 20,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
							fontSize: 12,
						}}>
						<FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="3x" />

						<span style={{ marginTop: 10, fontSize: "14px" }}>Home</span>
					</Link>
				</li>
				<li>
					<Link
						to="/profile"
						style={{
							marginLeft: 20,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
							fontSize: 12,
						}}>
						<FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="3x" />
						<span style={{ marginTop: 10, fontSize: "14px" }}>
							{userObj.displayName
								? `${userObj.displayName} Profile`
								: "Profile"}
						</span>
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navigation;

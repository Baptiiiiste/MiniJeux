import { createContext, useState, useEffect } from "react";
export const user_Connected = createContext(null);

function UserContext({ children }) {

	const [userConnected, setUserConnected] = useState(null);

	useEffect(() => {
		const user = localStorage.getItem("user");
		if (user) {
			setUserConnected(user);
		}
	}, []);


	return (
		<user_Connected.Provider value={{ userConnected, setUserConnected }}>
			{children}
		</user_Connected.Provider>
	);
	
}

export default UserContext;
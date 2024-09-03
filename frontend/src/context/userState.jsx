import userContext from "./userContext";
import { useState } from "react";

const UserState = (props) => {
    const host = "http://localhost:3001";

    const [user, setUser] = useState({
        name: "",
        email: "",
        contact: "",
        password: ""
    });

    const getUser = async () => {
        try {
            const response = await fetch(`${host}/api/user/get`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            console.log("response "+response)

            let json = await response.json();
// 
            if(json.user === undefined){
                return null;
            }
            console.log("befroe changing: " + json.user);
            // json = {
            //     name: "Niral",
            //     email: "nir@gm.com",
            //     contact: "1234567890",
            //     password: "123456"
            // }

            setUser(json.user);
            return json.user;
        } catch (error) {
            console.error("Error fetching user data:", error);
            return null;  // or you can return an appropriate default value
        }
    };

    return (
        <userContext.Provider value={{ getUser, user }}>
            {props.children}
        </userContext.Provider>
    );
};

export default UserState;

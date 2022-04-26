import { createContext } from "react";

const UserContext = createContext({user: {name: "",auth: false},login: (name: string,jwt: string) => {},logout: () => {}});

export default UserContext;
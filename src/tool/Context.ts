import { createContext } from "react";

export const AuthContext = createContext({ 
    userAuth: {
        token: '',
        userId: '',
        userName: '',
        userIcon: ''
    },
    login: (jwtToken: any, _id: any, login: any, icon:any) => {},
    logout: () => {},
})


type FriendsType = {
    icon: string,
    id: string,
    name: string
}

export const FriendsContext = createContext<{friends: FriendsType[]}>({ 
    friends: [],
})


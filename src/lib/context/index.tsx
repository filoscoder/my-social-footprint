import { createContext } from 'react';

type UserContextType = {
    token: string,
    userId: string,
}

const token = localStorage.getItem("ig_token") || process.env.REACT_APP_IG_TESTER_TOKEN || '';
const userId = localStorage.getItem("ig_user_id") || '';

const UserContext = createContext<UserContextType>({
    token: token,
    userId: userId
});

export default UserContext;
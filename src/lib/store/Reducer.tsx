import { UserContextType } from './index';

const Reducer = (state: UserContextType, action: any) => {
    switch (action.type) {
        case 'SET_SOCIAL':
            return {
                ...state,
                social: action.social
            };
        case 'SET_TOKEN':
            return {
                ...state,
                instagram_token: 'action'
            };
        case 'SET_USER_ID':
            return {
                ...state,
                instagram_userId: 'action'
            };

        default:
            return state;
    }
};

export default Reducer;
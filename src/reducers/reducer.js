import {combineReducers} from 'redux';
import UserReducer from './UserReducer';
import ProfileReducer from './ProfileReducer';
import OtherProfileReducer from './OtherProfileReducer';
import FriendButtonReducer from './FriendButtonReducer';

const reducer = combineReducers({
    user: UserReducer,
    profile: ProfileReducer,
    otherProfile: OtherProfileReducer,
    friendButton: FriendButtonReducer
});

export default reducer;

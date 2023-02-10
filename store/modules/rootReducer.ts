import { combineReducers } from 'redux';

import auth from './auth/reducer';
import contact from './admin/contact/reducer';
import search from './admin/shared/search/reducer';

export default combineReducers({
    auth,
    contact,
    search
});
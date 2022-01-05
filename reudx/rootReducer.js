import { combineReducers } from "redux";
import * as auth from "../Member/_Redux/Slice";
import { accountSlice } from "../Member/MainPage/Account/_Redux/Slice"
import { applicationSlice } from "../Member/MainPage/Application/_Redux/Slice"
import { announceSlice } from "../Member/MainPage/AnnounceMent/_Redux/Slice";
export const rootReducer = combineReducers({
    auth: auth.reducer,
    account: accountSlice.reducer,
    application: applicationSlice.reducer,
    announce: announceSlice.reducer,
});

export function* rootSaga() { }
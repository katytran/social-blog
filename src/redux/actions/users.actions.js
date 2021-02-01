import * as types from "../constants/users.constants";
import api from "../../apiService";


const userActions = {};

const register = (avatarUrl, name, email, password) => async(dispatch) => {
    dispatch({type: types.REGISTER_REQUEST})
    try {
        console.log("register is working")
        const response = await api.post("/users", {
            avatarUrl,
            name,
            email,
            password
        })
        console.log(response)
        if(response.success === true) {
            dispatch({type: types.REGISTER_SUCCESS, payload: response.data})
            console.log(response.data);
            console.log(response.success)
        }


export default userActions;

import { MdCallToAction } from "react-icons/md"

const initialState={
    isAuthencicated:false,
    userId: 1
}

const reducer = (state=initialState, action)=>{
    if(action.type == "ON_LOGIN"){
        return{
            ...state,
            isAuthencicated: true
        }
    }
    return state
}

export default reducer
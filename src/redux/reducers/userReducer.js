import {SET_USER, SET_AUTHENTICATED,MARK_NOTIFICATIONS_READ,
  SET_UNAUTHENTICATED,SET_ERRORS,CLEAR_ERRORS,LOADING_UI,LOADING_USER,LIKE_MEMORY,UNLIKE_MEMORY} from "../types";
const initialState={
  authenticated:false,
  loading:false,
  credentials:{},
  likes:[],
  notifications:[]
};
export default function(state=initialState,action){
  switch(action.type){
    case SET_AUTHENTICATED:
    return {
      ...state,
      authenticated:true
    };
    case SET_UNAUTHENTICATED:
    return initialState;
    case SET_USER:
    return {
      authenticated:true,
      loading:false,
      ...action.payload
    };
    case LOADING_USER:
    return{
      ...state,
      loading:true
    };
    case LIKE_MEMORY:
    return{
      ...state,
      likes:[
        ...state.likes,
        {
          userName:state.credentials.handle,
          memoryId:action.payload.memoryId
        }
      ]
    };
    case UNLIKE_MEMORY:
    return {
      ...state,
      likes:state.likes.filter(like=>like.memoryId!==action.payload.memoryId)
    };
    case MARK_NOTIFICATIONS_READ:
    state.notifications.forEach(not=>not.read=true);
    return{
      ...state
    };
    default:
    return state;
  }
}

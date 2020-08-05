import {SET_MEMORIES,
  LIKE_MEMORY,
  UNLIKE_MEMORY,
  LOADING_DATA,
DELETE_MEMORY,
POST_MEMORY,
SET_MEMORY,
SUBMIT_COMMENT} from "../types";

const initialState={
  memories:[],
  memory:{},
  loading:false
};

export default function(state=initialState,action){
  let index;
  switch(action.type){
    case LOADING_DATA:
    return{
      ...state,
      loading:true
    };
    case SET_MEMORIES:
    return{
      ...state,
      memories:action.payload,
      loading:false
    };
    case SET_MEMORY:
    return{
      ...state,
      memory:action.payload
    };
    case LIKE_MEMORY:
    case UNLIKE_MEMORY:
     index=state.memories.findIndex((memory)=>memory.memoryId===action.payload.memoryId);
    state.memories[index]=action.payload;
    if(state.memory.memoryId===action.payload.memoryId){
let temp=state.memory.comments;
      state.memory=action.payload;
      state.memory.comments=temp;
    }
    return{
      ...state
    };
    case DELETE_MEMORY:
  index=state.memories.findIndex(memory=>memory.memoryId===action.payload);
    state.memories.splice(index,1);
    return{
      ...state
    };
    case POST_MEMORY:
    return {
      ...state,
      memories:[
        action.payload,
        ...state.memories
      ]
    };
    case SUBMIT_COMMENT:
      index = state.memories.findIndex(
        memory => memory.memoryId === action.payload.memoryId
      );

      let updatedMemories = JSON.parse(JSON.stringify(state.memories));

      updatedMemories[index].commentCount += 1;
      return {
        ...state,
        memories: updatedMemories,
        memory: {
          ...state.memory,
          comments: [action.payload.comment, ...state.memory.comments],
          commentCount: state.memory.commentCount + 1
        }
      };
    default:
    return state;
  }
}

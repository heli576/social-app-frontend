import {SET_MEMORIES,
  LOADING_DATA,
  LIKE_MEMORY,
  UNLIKE_MEMORY,
DELETE_MEMORY,
POST_MEMORY,
CLEAR_ERRORS,
SET_ERRORS,
LOADING_UI,
SET_MEMORY,
STOP_LOADING_UI,
SUBMIT_COMMENT} from "../types";
import axios from "axios";

//Get all memories
export const getMemories=()=>dispatch=>{
  dispatch({type:LOADING_DATA});
  axios.get("/memories")
  .then(res=>{
    dispatch({
      type:SET_MEMORIES,
      payload:res.data
    })
  })
  .catch(err=>{
    dispatch({
      type:SET_MEMORIES,
      payload:[]
    })
  })
}

//Like a memory
export const likeMemory=(memoryId)=>dispatch=>{
  axios.get(`/memory/${memoryId}/like`)
  .then(res=>{
    dispatch({
      type:LIKE_MEMORY,
      payload:res.data
    })
  })
  .catch(err=>console.log(err));
}
//Unlike a memory
export const unlikeMemory=(memoryId)=>dispatch=>{
  axios.get(`/memory/${memoryId}/unlike`)
  .then(res=>{
    dispatch({
      type:UNLIKE_MEMORY,
      payload:res.data
    })
  })
  .catch(err=>console.log(err));
};

export const submitComment=(memoryId,commentData)=>dispatch=>{
  axios.post(`/memory/${memoryId}/comment`,commentData)
  .then((res)=>{
    dispatch({
      type:SUBMIT_COMMENT,
      payload:{memoryId:memoryId,comment:res.data}
    });
dispatch(clearErrors());

  })
  .catch(err=>{
    dispatch({
      type:SET_ERRORS,
      payload:err.response.data
    });
  });
};
//Memory dialog
export const getMemory=(memoryId)=>dispatch=>{
  dispatch({type:LOADING_UI});
  axios.get(`/memory/${memoryId}`)
  .then((res)=>{
    dispatch({
      type:SET_MEMORY,
      payload:res.data
    });
    dispatch({type:STOP_LOADING_UI});
  })
  .catch(err=>console.log(err));
}

//Post memory
export const postMemory=(newMemory)=>dispatch=>{
  dispatch({type:LOADING_UI});
  axios.post("/memory",newMemory)
  .then((res)=>{
    dispatch({
      type:POST_MEMORY,
      payload:res.data
    });
    dispatch(clearErrors());
  })
  .catch(err=>{
    dispatch({
      type:SET_ERRORS,
      payload:err.response.data
    })
  })
}
//Delete a memory
export const deleteMemory=(memoryId)=>dispatch=>{
axios.delete(`/memory/${memoryId}`)
  .then(()=>{
    dispatch({
      type:DELETE_MEMORY,
      payload:memoryId});
  })
  .catch(err=>console.log(err));
};
export const getUserData=(userName)=>dispatch=>{
  dispatch({type:LOADING_DATA});
  axios.get(`/user/${userName}`)
  .then(res=>{
    dispatch({
      type:SET_MEMORIES,
      payload:res.data.memories
    });
  })
  .catch(()=>{
    dispatch({
      type:SET_MEMORIES,
      payload:null
    })
  })
}
export const clearErrors=()=>dispatch=>{
  dispatch({type:CLEAR_ERRORS});
};

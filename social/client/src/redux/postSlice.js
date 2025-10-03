import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    postData: [],
  },

  reducers: {
    setPostData: (state, action) => {
      state.postData = action.payload;
    },

    updatePost: (state, action) => {
      const updatedPost = action.payload
      const index = state.postData.findIndex(post => post._id === updatedPost._id)
      if (index !== -1) {
        state.postData[index] = updatedPost
      }
    }

    // clearUser:(state , action)=>{
    //     state.userData= null
    // }
  },
});

export const { setPostData  , updatePost} = postSlice.actions;
export default postSlice.reducer;

const initialState = {
  // Define your initial state properties here
  profilePhoto: null,
  // ... other user-related state properties
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_PROFILE_PHOTO':
      return {
        ...state,
        user: {
            ...state.user,
            profilePhoto: action.payload,
            },
        };
    default:
        return state;
    }
};

export default userReducer;
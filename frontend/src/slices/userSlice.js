import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axiosInstance';

export const fetchUser = createAsyncThunk('user/fetchUser', async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get('/profile/me');
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const addFriend = createAsyncThunk('user/addFriend', async (friendId, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`/friends/${friendId}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const fetchProfile = createAsyncThunk(
  'user/fetchProfile',
  async (username, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/profile/${username}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put('/profile/me', profileData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProfilePhoto = createAsyncThunk(
  'user/updateProfilePhoto',
  async (photoUrl, { rejectWithValue }) => {
    try {
      // You might want to update this to match your API
      const response = await axiosInstance.put('/profile/me/profilePhoto', { photoUrl });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCoverPhoto = createAsyncThunk(
  'user/updateCoverPhoto',
  async (photoUrl, { rejectWithValue }) => {
    try {
      // You might want to update this to match your API
      const response = await axiosInstance.put('/profile/me/coverPhoto', { photoUrl });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        profileUser: null,
        token: null,
        status: 'idle',
        error: null,
        location: 'US',
        isNavbarVisible: true,
        allProfiles: [],
        isEditing: false,
        editedUser: null,
        profilePhotoFile: null,
        coverPhotoFile: null,
        profilePhotoPreview: null,
        coverPhotoPreview: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
        setLocation: (state, action) => {
            state.location = action.payload;
        },
        setNavbarVisibility: (state, action) => {
            state.isNavbarVisible = action.payload;
        },
        setIsEditing: (state, action) => {
            state.isEditing = action.payload;
        },
        setEditedUser: (state, action) => {
            state.editedUser = action.payload;
        },
        setProfilePhotoFile: (state, action) => {
            state.profilePhotoFile = action.payload;
        },
        setCoverPhotoFile: (state, action) => {
            state.coverPhotoFile = action.payload;
        },
        setProfilePhotoPreview: (state, action) => {
            state.profilePhotoPreview = action.payload;
        },
        setCoverPhotoPreview: (state, action) => {
            state.coverPhotoPreview = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(addFriend.fulfilled, (state, action) => {
                if (state.user) {
                    state.user.friends = action.payload;
                }
            })
            .addCase(fetchProfile.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.profileUser = action.payload;
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.user = action.payload;
                state.profileUser = action.payload;
            })
            .addCase(updateProfilePhoto.fulfilled, (state, action) => {
                if (state.user) {
                    state.user.profilePhoto = action.payload.profilePhoto;
                }
                if (state.profileUser) {
                    state.profileUser.profilePhoto = action.payload.profilePhoto;
                }
            })
            .addCase(updateCoverPhoto.fulfilled, (state, action) => {
                if (state.user) {
                    state.user.coverPhoto = action.payload.coverPhoto;
                }
                if (state.profileUser) {
                    state.profileUser.coverPhoto = action.payload.coverPhoto;
                }
            });
    },
});

export const { 
    setUser, 
    setToken, 
    logout, 
    setLocation, 
    setNavbarVisibility, 
    setIsEditing,
    setEditedUser,
    setProfilePhotoFile,
    setCoverPhotoFile,
    setProfilePhotoPreview,
    setCoverPhotoPreview
} = userSlice.actions;
export const selectAllProfiles = (state) => state.user.allProfiles;
export default userSlice.reducer;
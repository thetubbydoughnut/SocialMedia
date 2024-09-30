import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../utils/axiosInstance';

// Async Thunks
export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
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
  'profile/updateProfile',
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
  'profile/updateProfilePhoto',
  async (photoFile, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append('profilePhoto', photoFile);
    try {
      const response = await axiosInstance.post('/profile/me/profilePhoto', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCoverPhoto = createAsyncThunk(
  'profile/updateCoverPhoto',
  async (photoFile, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append('coverPhoto', photoFile);
    try {
      const response = await axiosInstance.post('/profile/me/coverPhoto', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const searchProfiles = createAsyncThunk(
  'profile/searchProfiles',
  async (query, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/profile/search/profiles?query=${query}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Initial State
const initialState = {
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
  searchResults: [],
  searchStatus: 'idle',
};

// Slice
const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setNavbarVisibility: (state, action) => {
      state.isNavbarVisible = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setEditedUser: (state, action) => {
      state.editedUser = action.payload;
    },
    setIsEditing: (state, action) => {
      state.isEditing = action.payload;
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
      // Fetch Profile
      .addCase(fetchProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profileUser = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Update Profile
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.profileUser = action.payload;
      })
      // Update Profile Photo
      .addCase(updateProfilePhoto.fulfilled, (state, action) => {
        if (state.user) {
          state.user.profilePhoto = action.payload.profilePhoto;
        }
        if (state.profileUser) {
          state.profileUser.profilePhoto = action.payload.profilePhoto;
        }
      })
      // Update Cover Photo
      .addCase(updateCoverPhoto.fulfilled, (state, action) => {
        if (state.user) {
          state.user.coverPhoto = action.payload.coverPhoto;
        }
        if (state.profileUser) {
          state.profileUser.coverPhoto = action.payload.coverPhoto;
        }
      })
      // Search Profiles
      .addCase(searchProfiles.pending, (state) => {
        state.searchStatus = 'loading';
      })
      .addCase(searchProfiles.fulfilled, (state, action) => {
        state.searchStatus = 'succeeded';
        state.searchResults = action.payload;
      })
      .addCase(searchProfiles.rejected, (state, action) => {
        state.searchStatus = 'failed';
        state.error = action.payload;
      });
  },
});

// Export Actions
export const {
  setNavbarVisibility,
  setLocation,
  setEditedUser,
  setIsEditing,
  setProfilePhotoFile,
  setCoverPhotoFile,
  setProfilePhotoPreview,
  setCoverPhotoPreview,
} = profileSlice.actions;

// Selectors
export const profileSelectors = {
  selectUser: (state) => state.profile.user,
  selectProfileUser: (state) => state.profile.profileUser,
  selectProfileStatus: (state) => state.profile.status,
  selectProfileError: (state) => state.profile.error,
  selectLocation: (state) => state.profile.location,
  selectIsNavbarVisible: (state) => state.profile.isNavbarVisible,
  selectIsEditing: (state) => state.profile.isEditing,
  selectEditedUser: (state) => state.profile.editedUser,
  selectProfilePhotoFile: (state) => state.profile.profilePhotoFile,
  selectCoverPhotoFile: (state) => state.profile.coverPhotoFile,
  selectProfilePhotoPreview: (state) => state.profile.profilePhotoPreview,
  selectCoverPhotoPreview: (state) => state.profile.coverPhotoPreview,
  selectSearchResults: (state) => state.profile.searchResults,
  selectSearchStatus: (state) => state.profile.searchStatus,
};

// Export Reducer
export default profileSlice.reducer;
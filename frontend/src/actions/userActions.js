import axiosInstance from '../utils/axiosInstance';
import { setUser } from '../slices/userSlice';

export const fetchUser = (username) => async (dispatch) => {
    try {
        const response = await axiosInstance.get(`/profile/${username}`);
        dispatch(setUser(response.data));
    } catch (error) {
        console.error('Error fetching user:', error);
    }
};

export const updateProfilePhoto = (photoUrl) => ({
    type: 'UPDATE_PROFILE_PHOTO',
    payload: photoUrl,
});
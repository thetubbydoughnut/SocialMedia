const handleLogin = async () => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, { username, password });
    const { token } = response.data;
    localStorage.setItem('token', token);
    // Dispatch action to set token in Redux store
    dispatch(setToken(token));
  } catch (error) {
    console.error('Login failed:', error);
  }
};
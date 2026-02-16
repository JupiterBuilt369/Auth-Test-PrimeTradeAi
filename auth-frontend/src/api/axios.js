    import axios from 'axios';

    // Create an instance of axios
    const api = axios.create({
        baseURL: process.env.REACT_APP_API_URL || 'http://localhost:4000', // Points to your Node server
        withCredentials: true // VITAL: Allows cookies to be sent/received
    });

    // 1. Request Interceptor: Attaches the Access Token to every outgoing request
    api.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    console.log(api);
    // 2. Response Interceptor: Handles Token Expiry (403 Errors)
    api.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            // If error is 403 (Forbidden) and we haven't retried yet
            if (error.response && error.response.status === 403 && !originalRequest._retry && !originalRequest.url.includes('/auth/refresh')) {
                originalRequest._retry = true; // Mark to prevent infinite loops

                try {
                    // A. Call the refresh endpoint (Cookie is sent automatically)
                    const response = await api.get('/auth/refresh');

                    // B. Get the new token & save it
                    const newAccessToken = response.data.accessToken;
                    localStorage.setItem('accessToken', newAccessToken);

                    // C. Update the header and Retry the original request
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return api(originalRequest);

                } catch (refreshError) {
                    // D. If refresh fails, the user is truly logged out
                    console.error("Session expired", refreshError);
                    localStorage.removeItem('accessToken');
                    window.location.href = '/login'; // Redirect to login
                }
            }
            return Promise.reject(error);
        }
    );

    export default api;
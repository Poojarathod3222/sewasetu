import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});
axios.post("http://localhost:8080/api/auth/login", { email, password })
  .then(res => {
    // handle login success
  })
  .catch(err => {
    console.error("Login error:", err.response);
    alert("Login failed: " + (err.response?.data?.message || "Server error"));
  });

export default api;

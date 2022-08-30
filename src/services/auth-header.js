export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (user && user.phone) {
      return { Authorization: 'Bearer ' + user.phone }; // for Spring Boot back-end
    } else {
      return {};
    }
  }
/**
 * Auth initial instance
 */
const authInstance = {
  isAuthenticated: false,
  signin(callback) {
    authInstance.isAuthenticated = true;
    setTimeout(callback, 100);
  },
  signout(callback) {
    authInstance.isAuthenticated = false;
    setTimeout(callback, 100);
  },
};

export { authInstance };
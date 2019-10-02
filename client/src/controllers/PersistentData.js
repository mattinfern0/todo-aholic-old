import Cookies from 'universal-cookie';
const cookies = new Cookies();

const setToken = (token) => {
  localStorage.setItem('accessToken', token);
};

const getToken = () => localStorage.getItem('accessToken');

const setCurrentUser = (currentUser) => {
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
};

const getCurrentUser = () => JSON.parse(localStorage.getItem('currentUser'));

const clearData = () => {
  localStorage.clear();
};

export {
  setToken,
  getToken,
  setCurrentUser,
  getCurrentUser,
  clearData,
};

import Cookies from 'universal-cookie';
const cookies = new Cookies();

const setToken = (token) => {
  cookies.set('accessToken', token, { path: '/'});
};

const getToken = () => cookies.get('accessToken');

const setCurrentUser = (currentUser) => {
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
};

const getCurrentUser = () => JSON.parse(localStorage.getItem('currentUser'));

const clearData = () => {
  cookies.remove('accessToken');
  localStorage.clear();
};

export {
  setToken,
  getToken,
  setCurrentUser,
  getCurrentUser,
  clearData,
};

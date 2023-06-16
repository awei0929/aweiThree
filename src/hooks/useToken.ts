export function useToken() {
  function getToken() {
    const token = localStorage.getItem('token');
    return !!token;
  }
  const isLogin = getToken();

  return { isLogin };
}

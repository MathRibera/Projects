export const getToken = async () => {
  // if (localStorage.getItem('token')) return;
  const url = 'https://opentdb.com/api_token.php?command=request';
  const data = await (await fetch(url)).json();
  const { token } = data;
  localStorage.setItem('token', token);
  return data;
};

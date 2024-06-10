function changeTheme(theme) {
  if (theme === 'dark') {
    document.body.setAttribute('arco-theme', 'dark');
    document.body.classList.add('dark');
  } else {
    document.body.removeAttribute('arco-theme');
    document.body.classList.remove('dark');
  }
}

export default changeTheme;

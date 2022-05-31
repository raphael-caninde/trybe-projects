const fetchHook = (url, value) => {
  if (!value) {
    return fetch(url)
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => err);
  }
  if (value) {
    return fetch(url.concat(value))
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => err);
  }
};

export default fetchHook;

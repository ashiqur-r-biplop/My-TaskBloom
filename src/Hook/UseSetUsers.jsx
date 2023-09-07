// use local storage to manage cart data
const addToDb = (key, value, email) => {
  const StoredUsers = JSON.parse(localStorage.getItem(key));
  let detail;
  if (StoredUsers) {
    const previousStorage = StoredUsers.find((d) => d.email === email);
    if (previousStorage) {
      return alert("already added");
    } else {
      const currentStorage = [...StoredUsers, value];
      localStorage.setItem(key, JSON.stringify(currentStorage));
    }
  } else {
    detail = [value];
    localStorage.setItem(key, JSON.stringify(detail));
  }
};

const getUsers = (Key) => {
  const getLocalStorageData = JSON.parse(localStorage.getItem(Key));
  return getLocalStorageData;
};

export { addToDb, getUsers };

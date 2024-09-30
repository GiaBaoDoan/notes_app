const useLocalStorage = (key: string) => {
  const setItem = (value: string) => localStorage.setItem(key, value);
  const getItem = () => localStorage.getItem(key);
  const removeItem = () => localStorage.removeItem(key);
  return { setItem, getItem, removeItem };
};
export default useLocalStorage;

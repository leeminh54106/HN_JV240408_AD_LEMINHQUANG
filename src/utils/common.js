
  // Lưu trữ dữ liệu lên local
export const saveData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};
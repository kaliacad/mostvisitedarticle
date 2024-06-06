const today = new Date();

const todayYear = today.getFullYear();
const todayMonth = String(today.getMonth() + 1).padStart(2, '0');
const todayDay = String(today.getDate()).padStart(2, '0');

export { todayYear, todayMonth, todayDay };

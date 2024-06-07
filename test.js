const date = new Date();
date.setDate(date.getDate() - 1);
const today = new Date();
today.setDate(today.getDate());

const todayYear = today.getFullYear();
const todayMonth = String(today.getMonth() + 1).padStart(2, '0');
const todayDay = String(today.getDate()).padStart(2, '0');

const startDate = date.toISOString().split('T')[0].split('-').join('');
const endDate = today.toISOString().split('T')[0].split('-').join('');
const start = `${todayYear}0101`;
const end = `${todayYear}${todayMonth}${todayDay}`;

console.log(startDate, endDate, start, end);

const dateStr = '2026-03-14';
const prevDate = new Date(dateStr + 'T00:00:00Z');
console.log('Original', prevDate);
prevDate.setUTCDate(prevDate.getUTCDate() - 1);
const prevDateStr = prevDate.toISOString().split('T')[0];
console.log('Result', prevDateStr);
console.log(new Date('2026-03-14T00:00:00Z'));
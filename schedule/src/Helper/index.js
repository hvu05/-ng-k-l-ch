// file: helper.js
import { ref, get, set } from "firebase/database";
import { database } from '../firebase';

const updateDayValue = async (day, delta) => {
  const dayRef = ref(database, `user/${day}`);
  const snapshot = await get(dayRef);

  if (snapshot.exists()) {
    const currentValue = snapshot.val();
    const newValue = Math.max(0, currentValue + delta); // không cho âm
    await set(dayRef, newValue);
  } else {
    await set(dayRef, Math.max(0, delta)); // nếu chưa tồn tại
  }
};
export { updateDayValue };
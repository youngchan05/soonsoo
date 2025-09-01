export const haptics = {
  light() {
    try {
      if ("vibrate" in navigator) navigator.vibrate(10); // 안드 크롬 OK
    } catch {}
  },
  medium() {
    try {
      if ("vibrate" in navigator) navigator.vibrate([12, 8, 12]);
    } catch {}
  },
};

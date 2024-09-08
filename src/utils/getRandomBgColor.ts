export const getRandomBgColor = () => {
  const colors = [
    "bg-blue",
    "bg-purple",
    "bg-orange",
    "bg-green",
    "bg-yellow",
    "bg-red",
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

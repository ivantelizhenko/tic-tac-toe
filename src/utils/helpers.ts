export function setIdToLocalStorage(id: string) {
  localStorage.setItem("tic-tac-toe/userId", id);
}
export function getIdFromLocalStorage() {
  const id = localStorage.getItem("tic-tac-toe/userId");

  return id;
}

export function isMoreThanFiveMinutesApart({
  time,
  type,
}: {
  time: string;
  type: "created" | "updated";
}): boolean {
  const lastUpdatedTimeInMs = new Date(time).getTime();
  const nowInMs = new Date().getTime();

  const diffInMilliseconds = Math.abs(lastUpdatedTimeInMs - nowInMs);
  const ms = { created: 3 * 60 * 1000, updated: 15 * 1000 };

  return diffInMilliseconds > ms[type];
}

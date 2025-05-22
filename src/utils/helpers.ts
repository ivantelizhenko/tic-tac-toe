export function setIdToLocalStorage(id: string) {
  localStorage.setItem("tic-tac-toe/userId", id);
}
export function getIdFromLocalStorage() {
  const id = localStorage.getItem("tic-tac-toe/userId");

  return id;
}

export function isMoreThanFiveMinutesApart(lastUpdatedTime: string): boolean {
  const lastUpdatedTimeInMs = new Date(lastUpdatedTime).getTime();
  const nowInMs = new Date().getTime();

  const diffInMilliseconds = Math.abs(lastUpdatedTimeInMs - nowInMs);
  const fiveMinutesInMs = 5 * 60 * 1000;

  return diffInMilliseconds > fiveMinutesInMs;
}

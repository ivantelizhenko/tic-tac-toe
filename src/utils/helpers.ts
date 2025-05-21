export function setIdToLocalStorage(id: string) {
  localStorage.setItem("tic-tac-toe/userId", id);
}
export function getIdFromLocalStorage() {
  const id = localStorage.getItem("tic-tac-toe/userId");

  return id;
}

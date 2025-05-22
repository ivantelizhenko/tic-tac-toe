import { supabase } from "../lib/supabase";

export async function getGames() {
  const { data: game, error } = await supabase
    .from("games")
    .select("*")
    .single();

  if (error) {
    await supabase.from("games").delete().neq("id", "");
    const game = await createGame();
    return game;
  }

  return game;
}

export async function createGame() {
  const gameId = Math.random().toString();

  const { data: game } = await supabase
    .from("games")
    .insert([{ id: gameId }])
    .select();

  return game;
}

export async function addUserId({
  userId,
  side,
}: {
  userId: string;
  side: "X" | "O";
}) {
  const { data: game } = await supabase.from("games").select("*").single();

  if (
    (game.userIdX && game.userIdO) ||
    game === null ||
    game.userIdX === userId ||
    game.userIdO === userId
  )
    return;

  const addUserId = side === "O" ? { userIdO: userId } : { userIdX: userId };

  await supabase.from("games").update(addUserId).eq("id", game.id);
}

export async function updateBoard(board: string) {
  const { data: game } = await supabase.from("games").select("*").single();
  const nextTurn = game.turn === "X" ? "O" : "X";

  const now = new Date();

  await supabase
    .from("games")
    .update({ board, turn: nextTurn, updatedAt: now })
    .eq("id", game.id);
}

export async function resetGame() {
  await supabase.from("games").delete().neq("id", "");
  await createGame();
}

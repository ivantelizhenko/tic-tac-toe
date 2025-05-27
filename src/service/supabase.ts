import { supabase } from "../lib/supabase";
import { createBoard } from "../utils/utils";
// import { isMoreThanFiveMinutesApart } from "../utils/helpers";

export async function createGame(id: string) {
  const { data: game } = await supabase.from("games").insert([{ id }]).select();

  return game;
}

export async function deleteGame(id: string) {
  await supabase.from("games").delete().eq("id", id);
}

export async function getGame(gameId: string) {
  const { data: game, error } = await supabase
    .from("games")
    .select("*")
    .eq("id", gameId)
    .single();

  if (error) console.log(error);

  return game;
}

export async function updateGame({
  gameId,
  updates,
}: {
  gameId: string | null;
  updates: object;
}) {
  if (!gameId) return;

  const { data: game, error } = await supabase
    .from("games")
    .update(updates)
    .eq("id", gameId)
    .select()
    .single();

  if (error) console.log(error);

  return game;
}

export async function resetGame(id: string) {
  const updates = {
    userIdX: null,
    userIdO: null,
    board: JSON.stringify(createBoard()),
    turn: "X",
  };

  const game = await updateGame({ gameId: id, updates });

  return game;
}

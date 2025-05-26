import { supabase } from "../lib/supabase";
// import { isMoreThanFiveMinutesApart } from "../utils/helpers";

export async function createGame(id: string) {
  const now = new Date();

  const { data: game } = await supabase
    .from("games")
    .insert([{ id, createdAt: now }])
    .select();

  return game;
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

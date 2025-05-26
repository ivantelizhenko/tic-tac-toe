import { useQuery } from "@tanstack/react-query";
import { getGame } from "../service/supabase";

function useGetGame(gameId: string | null) {
  return useQuery({
    queryKey: ["game", gameId],
    queryFn: () => getGame(gameId!),
    enabled: !!gameId,
  });
}

export default useGetGame;

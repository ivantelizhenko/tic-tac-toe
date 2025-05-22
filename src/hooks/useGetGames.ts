import { useQuery } from "@tanstack/react-query";
import { getGames } from "../service/supabase";

function useGetGame() {
  return useQuery({
    queryKey: ["game"],
    queryFn: getGames,
    refetchInterval: 5 * 1000,
    retry: 2,
  });
}

export default useGetGame;

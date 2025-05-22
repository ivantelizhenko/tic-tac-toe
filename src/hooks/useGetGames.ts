import { useQuery } from "@tanstack/react-query";
import { getGames } from "../service/supabase";

function useGetGame() {
  return useQuery({
    queryKey: ["game"],
    queryFn: getGames,
  });
}

export default useGetGame;

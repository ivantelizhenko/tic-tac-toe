import { useQuery } from "@tanstack/react-query";
import { getGames } from "../service/supabase";

function useGetGame() {
  return useQuery({
    queryKey: ["games"],
    queryFn: getGames,
  });
}

export default useGetGame;

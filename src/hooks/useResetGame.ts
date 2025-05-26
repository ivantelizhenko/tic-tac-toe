import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resetGame as resetGameAPI } from "../service/supabase";

function useResetGame() {
  const queryClient = useQueryClient();

  const { mutateAsync: resetGame } = useMutation({
    mutationFn: resetGameAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["game"] });
    },
  });

  return { resetGame };
}

export default useResetGame;

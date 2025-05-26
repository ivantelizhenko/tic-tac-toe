import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateGame as updateGameAPI } from "../service/supabase";
import { useStore } from "../contexts/store";

function useDoMove() {
  const { gameId, board, turn } = useStore();
  const boardForAPI = JSON.stringify(board);
  const now = new Date();

  const queryClient = useQueryClient();

  const { mutateAsync: doMove } = useMutation({
    mutationFn: () =>
      updateGameAPI({
        gameId,
        updates: { board: boardForAPI, updatedAt: now, turn },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["game"] });
    },
  });

  return { doMove };
}

export default useDoMove;

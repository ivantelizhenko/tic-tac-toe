import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGame as createGameAPI } from "../service/supabase";

function useCreateGame() {
  const queryClient = useQueryClient();

  const { mutateAsync: createGame, isPending } = useMutation({
    mutationFn: createGameAPI,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["game"] });
    },
  });

  return { createGame, isPending };
}

export default useCreateGame;

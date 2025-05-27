import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateGame as updateGameAPI } from "../service/supabase";
import { useStore } from "../contexts/store";

function useAddPlayer() {
  const { gameId } = useStore();
  const queryClient = useQueryClient();

  const { mutateAsync: addPlayer, isPending } = useMutation({
    mutationFn: (data: { userIdX: string } | { userIdO: string }) =>
      updateGameAPI({ gameId, updates: data }),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["game"] });
    },
  });

  return { addPlayer, isPending };
}

export default useAddPlayer;

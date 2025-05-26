import { useMutation } from "@tanstack/react-query";
import { updateGame as updateGameAPI } from "../service/supabase";
import { useStore } from "../contexts/store";

function useAddPlayer() {
  const { gameId } = useStore();

  const { mutateAsync: addPlayer, isPending } = useMutation({
    mutationFn: (data: { userIdX: string } | { userIdO: string }) =>
      updateGameAPI({ gameId, updates: data }),
  });

  return { addPlayer, isPending };
}

export default useAddPlayer;

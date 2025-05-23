import { useMutation } from "@tanstack/react-query";
import { updateBoard as updateBoardAPI } from "../service/supabase";
import { useStore } from "../contexts/store";

function useUpdateBoard() {
  const { board } = useStore();

  const { mutateAsync: updateBoard, isPending } = useMutation({
    mutationFn: () => updateBoardAPI(JSON.stringify(board)),
  });

  return { updateBoard, isPending };
}

export default useUpdateBoard;

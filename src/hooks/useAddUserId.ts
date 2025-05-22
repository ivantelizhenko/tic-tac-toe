import { useMutation } from "@tanstack/react-query";
import { addUserId as addUserIdAPI } from "../service/supabase";

function useAddUserId() {
  const { mutateAsync: addUserId } = useMutation({
    mutationFn: addUserIdAPI,
  });

  return { addUserId };
}

export default useAddUserId;

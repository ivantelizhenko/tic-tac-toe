import { useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useStore } from "../contexts/store";
import type { SideType, TileType } from "../contexts/storeTypes";
import { useQueryClient } from "@tanstack/react-query";

function useRealtimeGame() {
  const { setBoard, setTurn, side, reset } = useStore();
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel(`realtime`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "games",
        },
        (payload) => {
          const { board, turn, updatedAt, userIdX, userIdO } = payload.new as {
            board: TileType[];
            turn: SideType;
            updatedAt: string | null;
            userIdX: string | null;
            userIdO: string | null;
          };

          // Це оновлює вікно вибору сторони
          if ((userIdX && !userIdO) || (!userIdX && userIdO)) {
            queryClient.refetchQueries({ queryKey: ["game"] });
          }

          const isNotDefaultBoard =
            board &&
            !board
              .map((tile) => tile.type)
              .find((type) => typeof type === "string");

          // Це оновлює гру, коли перестворилася нова
          if (isNotDefaultBoard && !updatedAt && !userIdX && !userIdO) {
            reset();
            queryClient.refetchQueries({ queryKey: ["game"] });
          }

          if (side === turn) {
            setBoard(board);
            setTurn(turn);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [setBoard, setTurn, side, queryClient, reset]);
}

export default useRealtimeGame;

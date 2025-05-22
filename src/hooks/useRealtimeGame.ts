import { useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useStore } from "../contexts/store";
import type { SideType, TileType } from "../contexts/storeTypes";
import { useQueryClient } from "@tanstack/react-query";

function useRealtimeGame() {
  const { setBoard, setTurn, side } = useStore();
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
          const { board, turn } = payload.new as {
            board: TileType[];
            turn: SideType;
          };

          // queryClient.invalidateQueries({ queryKey: ["game"] });

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
  }, [setBoard, setTurn, side, queryClient]);
}

export default useRealtimeGame;

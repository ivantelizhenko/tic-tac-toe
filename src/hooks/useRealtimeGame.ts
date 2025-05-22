import { useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useStore } from "../contexts/store";
import type { SideType, TileType } from "../contexts/storeTypes";

// function useRealtimeGameUpdates(getNewData: (data: any) => void) {
function useRealtimeGame() {
  const { setBoard, setTurn, side } = useStore();

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

          if (side === turn) {
            console.log("i wanna change");
            setBoard(board);
            setTurn(turn);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [setBoard, setTurn, side]);
}

export default useRealtimeGame;

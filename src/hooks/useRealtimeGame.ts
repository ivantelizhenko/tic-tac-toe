import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import { supabase } from "../lib/supabase";

import { useStore } from "../contexts/store";
import type { SideType, TileType } from "../contexts/storeTypes";

import { setUserIdToLocalStorage } from "../utils/helpers";

function useRealtimeGame() {
  const { setBoard, setTurn, setSide, side, resetGame, gameId, reset } =
    useStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    const channel = supabase
      .channel(`realtime`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "games",
          filter: `id=eq.${gameId}`,
        },
        (payload) => {
          const { board, turn, updatedAt, userIdX, userIdO, id } =
            payload.new as {
              id: string;
              board: TileType[];
              turn: SideType;
              updatedAt: string | null;
              userIdX: string | null;
              userIdO: string | null;
            };

          // Оновлення дошки для спостерігача
          if (side === "spectate") {
            setBoard(board);
          }

          // Якщо є два гравця і заходить хтось інший, то він додається як спостерігач
          if (!side && userIdX && userIdO) {
            setSide("spectate");
            setBoard(board);
          }

          // Це оновлює вікно вибору сторони
          if ((userIdX && !userIdO) || (!userIdX && userIdO)) {
            queryClient.refetchQueries({ queryKey: ["game"] });
          }

          // при натисканні на кпонку reset
          const isEmptyBoard =
            board && board.every((tile) => tile.type === null);
          if (isEmptyBoard && !updatedAt && !userIdX && !userIdO) {
            queryClient.refetchQueries({ queryKey: ["game"] });
            resetGame();
          }

          // при натисканні на кпонку back to menu
          if (!id) {
            navigate("/menu");
            reset();
            setUserIdToLocalStorage("");
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
  }, [
    gameId,
    queryClient,
    reset,
    setBoard,
    setTurn,
    side,
    setSide,
    navigate,
    resetGame,
  ]);
}

export default useRealtimeGame;

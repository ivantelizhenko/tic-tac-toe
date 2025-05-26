import type { SideType } from "../contexts/storeTypes";

export function createBoard() {
  const board: { type: SideType | null; id: string }[] = [
    { type: null, id: "a1snnvhf" },
    { type: null, id: "assnn2vhf" },
    { type: null, id: "asnn3vhf" },
    { type: null, id: "asnnv5hf" },
    { type: null, id: "as23nn4vhf" },
    { type: null, id: "asnn6vhf" },
    { type: null, id: "7asnnvhf" },
    { type: null, id: "a4sn8nvhf" },
    { type: null, id: "asn1nvhf" },
  ];

  return board;
}

export const positionsForWin = [
  [0, 1, 2],
  [2, 5, 8],
  [6, 7, 8],
  [0, 3, 6],
  [0, 4, 8],
  [2, 4, 6],
  [1, 4, 7],
  [3, 4, 5],
];

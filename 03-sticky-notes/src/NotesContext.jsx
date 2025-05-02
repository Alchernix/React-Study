import { createContext, useContext, useReducer } from "react";

export default function notesReducer(boards, action) {
  switch (action.type) {
    case "added": {
      const newBoard = {
        ...currentBoard,
        notes: [
          ...currentBoard.notes,
          {
            id: currentBoard.currentNoteIdx + 1,
            content: "",
            style: { top: "150px", left: "225px" },
          },
        ],
        currentNoteIdx: currentBoard.currentNoteIdx + 1,
      };
      return newBoard;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

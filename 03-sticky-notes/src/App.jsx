import { useReducer, useState } from "react";
import "./App.css";

const initialBoards = [
  {
    id: 1,
    style: { backgroundColor: "burlywood", borderColor: "bisque" },
    notes: [],
    currentNoteIdx: 0,
  },
  {
    id: 2,
    style: { backgroundColor: "#333", borderColor: "lightslategray" },
    notes: [],
    currentNoteIdx: 0,
  },
  {
    id: 3,
    style: { backgroundColor: "darkolivegreen", borderColor: "lightgray" },
    notes: [],
    currentNoteIdx: 0,
  },
];

const initialState = {
  boards: initialBoards,
  currentBoardId: 1,
};

function Board({ board, children }) {
  return (
    <section className="board" style={board.style}>
      {children}
    </section>
  );
}
// boardId context로 넘기기...
function Note({ note, boardId, onEditContent }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="note" style={note.style}>
      <div className="note-handle"></div>
      {isEditing ? (
        <textarea
          value={note.content}
          autoFocus
          onBlur={() => {
            setIsEditing(false);
          }}
          onChange={(e) => {
            onEditContent(boardId, note.id, e.target.value);
          }}
          className="note-content-input"
        ></textarea>
      ) : (
        <div
          className="note-content"
          onClick={() => {
            setIsEditing(true);
          }}
        >
          {note.content}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [boardStates, dispatch] = useReducer(boardsReducer, initialState);

  const currentBoard = boardStates.boards.find(
    (board) => board.id === boardStates.currentBoardId
  );

  function handlechangeBoard(boardId) {
    dispatch({
      type: "change_board",
      boardId,
    });
  }

  function handleAddNote(boardId) {
    dispatch({
      type: "add_note",
      boardId,
    });
  }

  function handleEditNoteContent(boardId, noteId, content) {
    dispatch({
      type: "edit_note_content",
      boardId,
      noteId,
      content,
    });
  }

  return (
    <main>
      <div className="btn-container">
        {boardStates.boards.map((board) => (
          <button
            key={board.id + "btn"}
            onClick={() => handlechangeBoard(board.id)}
          >
            Board {board.id}
          </button>
        ))}
      </div>
      <Board key={boardStates.currentBoardId} board={currentBoard}>
        {currentBoard.notes.map((note) => (
          <Note
            key={note.id}
            note={note}
            boardId={boardStates.currentBoardId}
            onEditContent={handleEditNoteContent}
          />
        ))}
      </Board>
      <button onClick={() => handleAddNote(boardStates.currentBoardId)}>
        Add new note
      </button>
    </main>
  );
}

function boardsReducer(boardStates, action) {
  switch (action.type) {
    case "change_board": {
      return {
        ...boardStates,
        currentBoardId: action.boardId,
      };
    }
    case "add_note": {
      const newBoards = boardStates.boards.map((board) => {
        if (boardStates.currentBoardId !== board.id) {
          return board;
        } else {
          const newNoteId = board.currentNoteIdx + 1;
          const newNote = {
            id: newNoteId,
            content: "",
            style: { top: "150px", left: "225px" },
          };
          const newBoard = {
            ...board,
            notes: [...board.notes, newNote],
            currentNoteIdx: newNoteId,
          };

          return newBoard;
        }
      });

      return {
        ...boardStates,
        boards: newBoards,
      };
    }
    case "edit_note_content": {
      const newBoards = boardStates.boards.map((board) => {
        if (boardStates.currentBoardId !== board.id) {
          return board;
        } else {
          const newNotes = board.notes.map((note) => {
            if (note.id !== action.noteId) {
              return note;
            } else {
              const newNote = { ...note, content: action.content };
              return newNote;
            }
          });
          return { ...board, notes: newNotes };
        }
      });

      return {
        ...boardStates,
        boards: newBoards,
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

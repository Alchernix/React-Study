import { useState, useRef } from "react";
import { useImmerReducer } from "use-immer";
import "./App.css";

const initialBoards = [
  {
    id: 1,
    style: { backgroundColor: "burlywood", borderColor: "bisque" },
    notes: [],
    currentNoteIdx: 0,
    lastZIndex: 0,
  },
  {
    id: 2,
    style: { backgroundColor: "#333", borderColor: "lightslategray" },
    notes: [],
    currentNoteIdx: 0,
    lastZIndex: 0,
  },
  {
    id: 3,
    style: { backgroundColor: "darkolivegreen", borderColor: "lightgray" },
    notes: [],
    currentNoteIdx: 0,
    lastZIndex: 0,
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

function Note({
  note,
  board,
  handleChangeBoardZIndex,
  onEditContent,
  onMove,
  onRemove,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [lastCoordinates, setLastCoordinates] = useState(null);
  const ref = useRef(null);

  function handleMouseDown(e) {
    e.target.setPointerCapture(e.pointerId);
    setLastCoordinates({
      x: e.clientX,
      y: e.clientY,
    });
    console.log(board);
    ref.current.style.zIndex = board.lastZIndex + 1;
    handleChangeBoardZIndex();
  }

  function handleMouseMove(e) {
    if (lastCoordinates) {
      setLastCoordinates({
        x: e.clientX,
        y: e.clientY,
      });
      onMove(note.id, e.movementX, e.movementY);
    }
  }

  function handleMouseUp(e) {
    setLastCoordinates(null);
  }

  return (
    <div ref={ref} className="note" style={note.style}>
      <div
        className="note-handle"
        onPointerDown={handleMouseDown}
        onPointerMove={handleMouseMove}
        onPointerUp={handleMouseUp}
      >
        <i
          className="fa-solid fa-xmark remove-note-btn"
          onClick={() => onRemove(note.id)}
        ></i>
      </div>
      {isEditing ? (
        <textarea
          value={note.content}
          autoFocus
          onBlur={() => {
            setIsEditing(false);
          }}
          onChange={(e) => {
            onEditContent(note.id, e.target.value);
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
  const [draft, dispatch] = useImmerReducer(boardsReducer, initialState);

  const currentBoard = draft.boards.find(
    (board) => board.id === draft.currentBoardId
  );

  function handlechangeBoard(boardId) {
    dispatch({
      type: "change_board",
      boardId,
    });
  }

  function handleChangeBoardZIndex() {
    dispatch({
      type: "change_board_z_index",
    });
  }

  function handleAddNote() {
    dispatch({
      type: "add_note",
    });
  }

  function handleEditNoteContent(noteId, content) {
    dispatch({
      type: "edit_note_content",
      noteId,
      content,
    });
  }

  function handleMoveNote(noteId, dx, dy) {
    dispatch({
      type: "move_note",
      noteId,
      dx,
      dy,
    });
  }

  function handleRemoveNote(noteId) {
    dispatch({
      type: "remove_note",
      noteId,
    });
  }

  return (
    <main>
      <div className="btn-container">
        {draft.boards.map((board) => (
          <button
            key={board.id + "btn"}
            onClick={() => handlechangeBoard(board.id)}
          >
            Board {board.id}
          </button>
        ))}
      </div>
      <Board key={draft.currentBoardId} board={currentBoard}>
        {currentBoard.notes.map((note) => (
          <Note
            key={note.id}
            note={note}
            board={currentBoard}
            handleChangeBoardZIndex={handleChangeBoardZIndex}
            onEditContent={handleEditNoteContent}
            onMove={handleMoveNote}
            onRemove={handleRemoveNote}
          />
        ))}
      </Board>
      <button onClick={() => handleAddNote()}>Add new note</button>
    </main>
  );
}

function boardsReducer(draft, action) {
  switch (action.type) {
    case "change_board": {
      draft.currentBoardId = action.boardId;
      break;
    }
    case "change_board_z_index": {
      const board = draft.boards.find(
        (board) => board.id === draft.currentBoardId
      );
      board.lastZIndex = board.lastZIndex + 1;
      break;
    }
    case "add_note": {
      const board = draft.boards.find(
        (board) => board.id === draft.currentBoardId
      );

      const newNoteId = board.currentNoteIdx + 1;
      board.notes.push({
        id: newNoteId,
        content: "",
        style: { top: "150px", left: "225px", zIndex: board.lastZIndex },
      });
      board.currentNoteIdx = newNoteId;
      board.lastZIndex = board.lastZIndex + 1;
      break;
    }
    case "edit_note_content": {
      const board = draft.boards.find(
        (board) => board.id === draft.currentBoardId
      );
      const note = board.notes.find((note) => note.id === action.noteId);

      note.content = action.content;
      break;
    }
    case "move_note": {
      const board = draft.boards.find(
        (board) => board.id === draft.currentBoardId
      );
      const note = board.notes.find((note) => note.id === action.noteId);

      const currentTop = parseInt(note.style.top, 10);
      const currentLeft = parseInt(note.style.left, 10);

      const newTop = Math.min(400 - 150, Math.max(0, currentTop + action.dy));
      const newLeft = Math.min(550 - 120, Math.max(0, currentLeft + action.dx));

      note.style.top = newTop;
      note.style.left = newLeft;
      break;
    }
    case "remove_note": {
      const board = draft.boards.find(
        (board) => board.id === draft.currentBoardId
      );
      board.notes = board.notes.filter((note) => note.id !== action.noteId);
      break;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

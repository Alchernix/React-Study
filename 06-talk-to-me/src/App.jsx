import { useImmerReducer } from "use-immer";
import { createContext, useContext, useState, useRef } from "react";
import { flushSync } from "react-dom";
import "./App.css";

let lastId = 2;

const initialMessages = [
  { id: 1, content: "Hello World!" },
  { id: 2, content: "Talk to Me" },
];

function Main({ lastMessageRef }) {
  const messages = useContext(MessagesContext);

  return (
    <div className="main">
      {messages.map((message) => (
        <Chat
          key={message.id}
          message={message}
          lastMessageRef={message.id === lastId ? lastMessageRef : undefined}
        />
      ))}
    </div>
  );
}

function Chat({ message, lastMessageRef }) {
  return (
    <div ref={lastMessageRef} className="message">
      {message.content}
    </div>
  );
}

function InputWindow({ handleAutoScroll }) {
  const [text, setText] = useState("");
  const dispatch = useContext(MessagesDispatchContext);
  const sendBtnRef = useRef(null);

  return (
    <form
      className="input-window"
      onSubmit={(e) => {
        e.preventDefault();
        flushSync(() => {
          setText("");
          dispatch({ type: "add", content: text });
        });
        sendBtnRef.current.focus();
        handleAutoScroll();
      }}
    >
      <input
        type="text"
        onChange={(e) => setText(e.target.value)}
        value={text}
        ref={sendBtnRef}
      />
      <button>
        <i className="fa-solid fa-paper-plane"></i>
      </button>
    </form>
  );
}

export default function App() {
  const lastMessageRef = useRef(null);

  function handleAutoScroll() {
    lastMessageRef.current.scrollIntoView({
      behavior: "smooth",
    });
  }

  return (
    <MessagesProvider>
      <main>
        <div className="header">Talk to Me</div>
        <Main lastMessageRef={lastMessageRef} />
        <InputWindow handleAutoScroll={handleAutoScroll} />
      </main>
    </MessagesProvider>
  );
}

// context + reducer

const MessagesContext = createContext(null);
const MessagesDispatchContext = createContext(null);

function MessagesProvider({ children }) {
  const [messages, dispatch] = useImmerReducer(
    messagesReducer,
    initialMessages
  );

  return (
    <MessagesContext.Provider value={messages}>
      <MessagesDispatchContext.Provider value={dispatch}>
        {children}
      </MessagesDispatchContext.Provider>
    </MessagesContext.Provider>
  );
}

function messagesReducer(messages, action) {
  switch (action.type) {
    case "add":
      {
        messages.push({ id: ++lastId, content: action.content });
      }
      break;
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

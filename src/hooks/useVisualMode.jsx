import { useState } from "react";

//mode is tracking empty, show, edit, create, saving/deleting, confirm, also transition, back to move between them
//history keeps track of modes
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  //updates current mode to newMode
  function transition(newMode, replace = false) {
    setMode(newMode);
    //inserts newMode into history array
    if (replace) {
      setHistory((prev) => [
        ...prev.slice(prev.length - 2, prev.length - 1),
        newMode,
      ]);
    } else {
      setHistory((prev) => [...prev, newMode]);
    }
  }

  //checks if there is anything in history array and sets the mode to the previous item in history
  function back() {
    if (history.length > 1 && history.pop()) {
      setMode(history[history.length - 1]);
    }
  }
  return { mode, transition, back };
}

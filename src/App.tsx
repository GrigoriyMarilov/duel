import "./App.css";
import { Arena } from "./components/arena/arena.tsx";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <div className={"page"}>
      <main>
        <Arena />
      </main>
    </div>
  );
};
export default App;

import { React, useEffect, useState } from "react";
import Headers from "components/Header.jsx";
import axios from "axios";

function App() {
  const [count, setCount] = useState(0);
  console.log(213);

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get("/api/get");
      console.log(data);
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <Headers />
      <div>23</div>
    </div>
  );
}

export default App;

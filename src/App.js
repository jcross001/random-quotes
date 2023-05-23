import { useCallback, useState } from "react";
import axios from "axios";

const App = () => {
  const [quotes, setQuotes] = useState([]);
  const [box, setBox] = useState(false);
  const [id, setId] = useState(null);

  const getQuotes = useCallback(async () => {
    try {
      const res = await axios.get("https://type.fit/api/quotes");
      if (res.status !== 200) {
        throw new Error("Something went wrong here!");
      }
      const data = res.data.map((idx) => {
        return {
          author: idx.author,
          content: idx.text,
        };
      });
      setQuotes(data);
      setBox(true);
      let idx = Math.floor(Math.random() * quotes.length);
      setId(idx);
    } catch (err) {
      console.log(err.message);
    }
  }, [quotes]);

  return (
    <div className="box">
      {box && (
        <div className="quotes">
          <h4>{quotes[id].author}</h4>
          <p>{quotes[id].content}</p>
        </div>
      )}
      <button onClick={getQuotes}>Get Quote</button>
    </div>
  );
};

export default App;

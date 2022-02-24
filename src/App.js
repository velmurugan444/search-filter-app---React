import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      const response = await axios.get("https://jsonplaceholder.typicode.com/albums");
      setPosts(response.data);
      setLoading(false);
    }
    loadPosts();
  }, []);

  return (
    <div className="App">
      <div className='container'>
        <h3 style={{ fontFamily: "cursive" }}>Search Filter App</h3>
        <input style={{ width: "30%", height: "25px" }} type="text" placeholder='search...' onChange={(e) => setSearchTitle(e.target.value)} />
      </div>
      {loading ? (
        <h4>Loading...</h4>
      ) : (posts.filter((value) => {
        if (searchTitle === "") {
          return value;
        } else if (value.title.toLowerCase().includes(searchTitle.toLowerCase())) {
          return value;
        }
      }).map((item) => <div><h5 style={{ fontFamily: "cursive", fontSize: "16px" }} key={item.id}>{item.title}</h5></div>))}
    </div>
  );
}

export default App;

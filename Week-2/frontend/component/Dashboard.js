import React, { useState, useEffect } from "react";

function Dashboard() {
  const [musicList, setMusicList] = useState([]);
  const [filters, setFilters] = useState({ genre: "", artist: "", date: "", popularity: "" });
  const [newMusic, setNewMusic] = useState({
    title: "",
    artist: "",
    genre: "",
    album: "",
    releaseDate: "",
    popularity: "",
  });

  const fetchMusic = async () => {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await fetch(`http://localhost:5000/api/music?${queryParams}`);
    const data = await response.json();
    setMusicList(data);
  };

  const handleCreateMusic = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/api/music", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMusic),
    });
    fetchMusic();
  };

  const handleDeleteMusic = async (id) => {
    await fetch(`http://localhost:5000/api/music/${id}`, { method: "DELETE" });
    fetchMusic();
  };

  useEffect(() => {
    fetchMusic();
  }, [filters]);

  return (
    <div className="dashboard">
      <h1>Music Dashboard</h1>

      <form onSubmit={handleCreateMusic}>
        <input type="text" placeholder="Title" onChange={(e) => setNewMusic({ ...newMusic, title: e.target.value })} />
        <input type="text" placeholder="Artist" onChange={(e) => setNewMusic({ ...newMusic, artist: e.target.value })} />
        <input type="text" placeholder="Genre" onChange={(e) => setNewMusic({ ...newMusic, genre: e.target.value })} />
        <input type="text" placeholder="Album" onChange={(e) => setNewMusic({ ...newMusic, album: e.target.value })} />
        <input type="date" onChange={(e) => setNewMusic({ ...newMusic, releaseDate: e.target.value })} />
        <input type="number" placeholder="Popularity (0-100)" onChange={(e) => setNewMusic({ ...newMusic, popularity: e.target.value })} />
        <button type="submit">Add Music</button>
      </form>

      <div className="filters">
        <h3>Filters</h3>
        <input type="text" placeholder="Genre" onChange={(e) => setFilters({ ...filters, genre: e.target.value })} />
        <input type="text" placeholder="Artist" onChange={(e) => setFilters({ ...filters, artist: e.target.value })} />
        <input type="date" onChange={(e) => setFilters({ ...filters, date: e.target.value })} />
        <input type="number" placeholder="Min Popularity" onChange={(e) => setFilters({ ...filters, popularity: e.target.value })} />
      </div>

      <div className="music-list">
        {musicList.map((music) => (
          <div key={music._id} className="music-item">
            <h4>{music.title}</h4>
            <p>Artist: {music.artist}</p>
            <p>Genre: {music.genre}</p>
            <p>Album: {music.album}</p>
            <p>Release Date: {new Date(music.releaseDate).toLocaleDateString()}</p>
            <p>Popularity: {music.popularity}</p>
            <button onClick={() => handleDeleteMusic(music._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;

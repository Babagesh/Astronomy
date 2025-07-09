const ACCESS_KEY = import.meta.env.VITE_CLASH_ROYALE_TOKEN;
import { useState } from 'react'
import './App.css'
export default function App()
{

  const [card, updateCard] = useState({
    name: "",
    id: "",
    elixirCost: "",
    iconUrls: "",
    rarity: ""
  })

  return (
    <div className = "App">

      <div className = "gallery">
        <h1> Who have we seen so far?</h1>
      </div>

      <div className = "card-box"> 
        <h1> Clash Royale Mayhem</h1>
        <h2> Discover various Clash Royale Cards!</h2>
      </div>

      <div className = "ban-list">
        <h1> Ban List</h1>
        <h2> Select a type you want to ban!</h2>
      </div>

    </div>
  );
}
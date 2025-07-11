import { useState } from 'react'
import './App.css'
import Card from '../src/components/Card'

const ACCESS_KEY = import.meta.env.VITE_CLASH_ROYALE_TOKEN;

export default function App()
{

  const [banned, updateBanned] = useState([]);

  const [seen, updateSeen] = useState([]);

  const [card, updateCard] = useState({
    title: "",
    date: "",
    url: null,
    concept_tags: {

    }
  });


  const makeQuery = () => {
    let year = Math.floor(1995 + Math.random() * 30)
    let month = Math.floor(1 + Math.random() * 12)
    let day;
    if(month == 2)
      day = Math.floor(1 + Math.random() * 28)
    else if(month == 4 || month == 6 || month == 9 || month == 11)
      day = Math.floor(1 + Math.random() * 30)
    else
      day = Math.floor(1 + Math.random() * 31)

    let dateString = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    let query = `https://api.nasa.gov/planetary/apod?api_key=${ACCESS_KEY}&date=${dateString}`
    apiCall(query).catch(console.error)

  }

  const ban = (e) => {
    let attribute = e.target.value;
    updateBanned([...banned, attribute])

  }
  async function apiCall (query) {
    try
    {
      const response = await fetch(query);
      const json = await response.json();

      for(let card of banned)
      {
        if(card === json.date)
        {
          makeQuery();
          return;
        }
      }
      updateCard({
        title: json.title,
        date: json.date,
        url: json.url,
        concept_tags: json.explanation
      })

      updateSeen([...seen, json.url])
    }
    catch(error)
    {
      console.error("Error fetching data:", error);
    }

  }

  return (
    <div className = "App">

      <div className = "gallery">
        <h1> What have we seen so far?</h1>
        <ul> {
          seen.map((url,index) =>
            <li key = {index}> <img className = "astronomy-image" src = {url}/> </li>
          )
        }
        </ul>
      </div>

      <div className = "card-box"> 
        <h1> Astronomy Picture of the Day</h1>
        <h2> Discover the astronomy picture of the day!</h2>
        <button onClick = {makeQuery}> Discover! </button>
        {card.url && (<Card 
          name = {card.title}
          date = {card.date}
          url = {card.url}
          concept_tags = {card.concept_tags}
          onBan = {ban}
        />)}
      </div>

      <div className = "ban-list">
        <h1> Ban List</h1>
        <h2> Select the date you want to ban!</h2>
        <ul>
          {
            banned.map((ban,index) => 
              <li key={index}><button onClick = {
                () => {
                  updateBanned(banned.filter(
                    (banItem) => banItem !== ban
                  )
                )
                }
              }>{ban}</button></li>
            )
          }
        </ul>
      </div>

    </div>
  );
}
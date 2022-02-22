import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { getDocs, collection } from "firebase/firestore";
import { db } from '../../firebase/firesbaseConfig'
export default function Main() {
  const [globalGames, setGlobalGames] = useState(0);

  useEffect(() => {
    readAllGameplays()
  }, []);

  const readAllGameplays = async () => {

    const allGames = collection(db, "allGames")
    const documentGameplays = await getDocs(allGames)
    const readArray = documentGameplays._snapshot.docChanges
    setGlobalGames(readArray.length)
  }
  return (
    <>
      <h1>Games</h1>
      <NavLink to="/rps" >RPS</NavLink>
      <br></br>
      {globalGames + " Total bets"}
    </>
  );
}
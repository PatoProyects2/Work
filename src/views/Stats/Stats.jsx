import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { query, where, collection, limit, onSnapshot } from "firebase/firestore";
import RPSStats from './components/Info/RPSStats'
import RPSStatsNew from './components/Info/RPSStatsNew'
import Chart from './components/Chart/Chart'
import Level from './components/Info/Level'
import { Context } from '../../context/Context';
import { db } from '../../config/firesbaseConfig'

const StyledProfile = styled.div`
    width: 100%;

    .TitleUsuario {      
        height: 50px;
        display: flex;
        align-items: center;
        color: white;
        border-top-right-radius: 20px;
        border-top-left-radius: 20px;
        font-size: 20px;
        justify-content: center;
        background-color: #554c77;
    }

    .profile-container {
      width: 100%;
    }

    .profile-info {
      display: flex;
    }
  `

const Stats = () => {
  const { discordId } = useContext(Context);
  const [userData, setUserData] = useState({});
  const [register, setRegister] = useState('');

  useEffect(() => {
    const q = query(collection(db, "clubUsers"), where("uid", "==", discordId), limit(1))
    const unsub = onSnapshot(q, (doc) => {
      const clubData = doc.docs.map(userData => userData.data())
      setUserData(clubData)
    });
    return () => unsub()
  }, [discordId])

  useEffect(() => {
    if (userData[0]) {
      var date = new Date(userData[0].register * 1000);
      setRegister(date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear());
    }
  }, [userData])

  return (
    <StyledProfile>
      {discordId !== '' ?
        <div className="profile-container">
          <h3 className="TitleUsuario my-3 text-center">{userData[0] && userData[0].name + "#" + userData[0].id} Stats</h3>
          <div className="profile-info">
            <div className="profile-info-container">
              <img
                alt={userData[0] && userData[0].name}
                className="rounded-circle profile-img"
                src={(userData[0] && userData[0].photo) && userData[0].photo}
              />
              <p style={{ textAlign: "center", color: "#ffda5c" }}>{userData[0] && userData[0].name + "#" + userData[0].id}</p>
              <Level userData={userData} />
            </div>
            <div className="profile-stats-container">
              <RPSStats userData={userData} />
            </div>
          </div>
          <div className="mt-2">
            <RPSStatsNew userData={userData} />
          </div>
          <div className="mt-2">
            <Chart userData={userData[0]} discordId={discordId} />
          </div>
        </div>
        :
        <h2 className='text-center mt-3'>Connect with Discord</h2>
      }
    </StyledProfile>
  );
}

export default Stats;
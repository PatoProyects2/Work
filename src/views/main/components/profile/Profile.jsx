import React, { useState, useEffect, useContext } from 'react'
import { query, where, collection, limit, onSnapshot } from "firebase/firestore";
import { db } from '../../../../firebase/firesbaseConfig'
import Stats from './Stats'
import Chart from './Chart'
import Level from './Level'
import { Context } from '../../../../context/Context';
export default function Profile() {
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
    <>
      {discordId !== '' ?
        <>
          <div className="profile-container">
            <h3 className="my-3 text-center">{userData[0] && userData[0].name + "#" + userData[0].id} Stats</h3>
            <div className="d-flex flex-row justify-content-between align-items-center gap-5">
              <div className="profile-info-container">
                <img
                  alt={userData[0] && userData[0].name}
                  className="rounded-circle profile-img"
                  src={(userData[0] && userData[0].photo) && userData[0].photo}
                />
                 <Level userData={userData} />
                <span>User since: {register}</span>
              </div>
              <div className="profile-data-container">
                <div className="profile-stats-container">
                  <Stats userData={userData} />
                </div>
                <div className="profile-chart-container">
                  <Chart userData={userData[0]} discordId={discordId} />
                </div>
              </div>
            </div>
          </div>
        </>
        :
        <h2 className='text-center mt-3'>Connect with Discord</h2>
      }
    </>
  );
}
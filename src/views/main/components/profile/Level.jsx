import React from 'react';
export default function Level({ userData }) {
  const xpClass = (level) => {
    if (level <= 4) {
      return 'xp-user-badge badge-white';
    } else if (level > 4 && level < 10) {
      return 'xp-user-badge badge-yellow';
    } else if (level > 9 && level < 15) {
      return 'xp-user-badge badge-orange';
    } else if (level > 14 && level < 20) {
      return 'xp-user-badge badge-green';
    } else if (level > 19 && level < 24) {
      return 'xp-user-badge badge-blue';
    } else {
      return 'xp-user-badge badge-brown';
    }
  }
  return (
    <>
      {userData[0] &&
        <>
          <div className={xpClass(userData[0].level)}>
            <span className="circle">
              <span>{userData[0].level}</span>
            </span>
          </div>
          {userData[0].level === 1 &&
            <>
              {userData[0].rps.totalGames + " / " + 10}
            </>
          }
          {userData[0].level === 2 &&
            <>
              {userData[0].rps.totalGames + " / " + 20}
            </>
          }
          {userData[0].level === 3 &&
            <>
              {userData[0].rps.totalGames + " / " + 30}
            </>
          }
          {userData[0].level === 4 &&
            <>
              {userData[0].rps.totalGames + " / " + 40}
            </>
          }
          {userData[0].level === 5 &&
            <>
              {userData[0].rps.totalGames + " / " + 50}
            </>
          }
          {userData[0].level === 6 &&
            <>
              {userData[0].rps.totalGames + " / " + 65}
            </>
          }
          {userData[0].level === 7 &&
            <>
              {userData[0].rps.totalGames + " / " + 80}
            </>
          }
          {userData[0].level === 8 &&
            <>
              {userData[0].rps.totalGames + " / " + 95}
            </>
          }
          {userData[0].level === 9 &&
            <>
              {userData[0].rps.totalGames + " / " + 110}
            </>
          }
          {userData[0].level === 10 &&
            <>
              {userData[0].rps.totalGames + " / " + 125}
            </>
          }
          {userData[0].level === 11 &&
            <>
              {userData[0].rps.totalGames + " / " + 150}
            </>
          }
          {userData[0].level === 12 &&
            <>
              {userData[0].rps.totalGames + " / " + 200}
            </>
          }
          {userData[0].level === 13 &&
            <>
              {userData[0].rps.totalGames + " / " + 250}
            </>
          }
          {userData[0].level === 14 &&
            <>
              {userData[0].rps.totalGames + " / " + 300}
            </>
          }
          {userData[0].level === 15 &&
            <>
              {userData[0].rps.totalGames + " / " + 350}
            </>
          }
          {userData[0].level === 16 &&
            <>
              {userData[0].rps.totalGames + " / " + 390}
            </>
          }
          {userData[0].level === 17 &&
            <>
              {userData[0].rps.totalGames + " / " + 430}
            </>
          }
          {userData[0].level === 18 &&
            <>
              {userData[0].rps.totalGames + " / " + 470}
            </>
          }
          {userData[0].level === 19 &&
            <>
              {userData[0].rps.totalGames + " / " + 510}
            </>
          }
          {userData[0].level === 20 &&
            <>
              {userData[0].rps.totalGames + " / " + 550}
            </>
          }
          {userData[0].level === 21 &&
            <>
              {userData[0].rps.totalGames + " / " + 600}
            </>
          }
          {userData[0].level === 22 &&
            <>
              {userData[0].rps.totalGames + " / " + 650}
            </>
          }
          {userData[0].level === 23 &&
            <>
              {userData[0].rps.totalGames + " / " + 700}
            </>
          }
          {userData[0].level === 24 &&
            <>
              {userData[0].rps.totalGames + " / " + 750}
            </>
          }
          {userData[0].level === 25 &&
            <>
              {"MAX LEVEL"}
            </>
          }
        </>
      }
    </>
  )
}
import React from 'react';
import { Progress } from 'reactstrap';

const ProgressExp = ({ maxGames, minGames, cGames, xpClass }) => {

  if (!maxGames && !minGames) {
    // MAX LEVEL
    return (
      <div className='d-flex flex-column align-items-center'>
        <Progress value={750} striped={true} className="w-100" color={xpClass}></Progress><small>MAX LEVEL</small>
      </div>
    )
  }

  return (
    <div className='d-flex flex-column align-items-center'>
      <Progress
        value={((cGames - minGames) / (maxGames - minGames)) * 100}
        striped={true}
        className='w-100'
        color={xpClass}>
      </Progress>
      <small>{`${cGames}/${maxGames} games`}</small>
    </div>
  );
}

const Level = ({ userData, showLvl = true }) => {
  const totalGamesPerLevel = [10, 20, 30, 40, 50, 65, 80, 95, 110, 125, 150, 200, 250, 300, 350, 390, 430, 470, 510, 550, 600, 650, 700, 750];

  const getMinMaxGames = (level) => {
    if (level < totalGamesPerLevel.length) {
      return {
        maxGames: totalGamesPerLevel[level - 1],
        minGames: totalGamesPerLevel[level - 2] ? totalGamesPerLevel[level - 2] : 0
      }
    }
    return null;
  }

  const xpClass = (level) => {
    if (level <= 4) {
      return ['xp-user-badge badge-white', 'white'];
    } else if (level > 4 && level < 10) {
      return ['xp-user-badge badge-yellow', 'yellow'];
    } else if (level > 9 && level < 15) {
      return ['xp-user-badge badge-orange', 'orange'];
    } else if (level > 14 && level < 20) {
      return ['xp-user-badge badge-green', 'green'];
    } else if (level > 19 && level < 24) {
      return ['xp-user-badge badge-blue', 'blue'];
    } else {
      return ['xp-user-badge badge-brown', 'brown'];
    }
  }

  return (
    <>
      {userData[0] &&
        <>
          <div className='my-2'>
            <ProgressExp {...getMinMaxGames(userData[0].level)} cGames={userData[0].rps.totalGames} xpClass={xpClass(userData[0].level)[1]} />
          </div>
        </>
      }
    </>
  )
}

export default Level;

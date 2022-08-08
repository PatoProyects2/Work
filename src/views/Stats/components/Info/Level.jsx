import { Progress } from "reactstrap";

const ProgressExp = ({ maxGames, minGames, cGames, xpClass }) => {
  if (!maxGames && !minGames) {
    return (
      <div className="d-flex flex-column align-items-center">
        <Progress
          value={690}
          striped={true}
          className="w-100"
          color={xpClass}
        ></Progress>
        <small>MAX LEVEL</small>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column align-items-center">
      <Progress
        value={((cGames - minGames) / (maxGames - minGames)) * 100}
        striped={true}
        className="w-100"
        color={xpClass}
      ></Progress>
      <small className="text-white">{`${cGames}/${maxGames} games`}</small>
    </div>
  );
};

const Level = ({ clubUser, showLvl = true }) => {
  const totalGamesPerLevel = [
    10, 20, 30, 40, 55, 70, 85, 100, 115, 140, 165, 190, 215, 240, 280, 320,
    360, 400, 440, 490, 540, 590, 640, 690,
  ];

  const getMinMaxGames = (level) => {
    if (level < totalGamesPerLevel.length) {
      return {
        maxGames: totalGamesPerLevel[level - 1],
        minGames: totalGamesPerLevel[level - 2]
          ? totalGamesPerLevel[level - 2]
          : 0,
      };
    }
    return null;
  };

  const xpClass = (level) => {
    if (level <= 4) {
      return ["xp-user-badge badge-yellow", "yellow"];
    } else if (level > 4 && level < 10) {
      return ["xp-user-badge badge-orange", "orange"];
    } else if (level > 9 && level < 15) {
      return ["xp-user-badge badge-pink", "pink"];
    } else if (level > 14 && level < 20) {
      return ["xp-user-badge badge-blue", "blue"];
    } else if (level > 19 && level < 24) {
      return ["xp-user-badge badge-green", "green"];
    } else {
      return ["xp-user-badge badge-red", "red"];
    }
  };

  return (
    <>
      <div className="my-2">
        <ProgressExp
          {...getMinMaxGames(clubUser.level)}
          cGames={clubUser.rps.gameWon + clubUser.rps.gameLoss}
          xpClass={xpClass(clubUser.level)[1]}
        />
      </div>
    </>
  );
};

export default Level;

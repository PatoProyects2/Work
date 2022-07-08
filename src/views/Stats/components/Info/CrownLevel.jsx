import Crown from "../../../../assets/imgs/Chat Panel/Crown.png";

const CrownLevel = ({userLevel}) => {
  const xpClass = () => {
    const level = userLevel;
    if (level <= 4) {
      return "xp-user-badge badge-yellow";
    } else if (level > 4 && level < 10) {
      return "xp-user-badge badge-orange";
    } else if (level > 9 && level < 15) {
      return "xp-user-badge badge-pink";
    } else if (level > 14 && level < 20) {
      return "xp-user-badge badge-blue";
    } else if (level > 19 && level < 24) {
      return "xp-user-badge badge-green";
    } else {
      return "xp-user-badge badge-black";
    }
  };

  return (
    <div className={xpClass()}>
      <img src={Crown} alt="Level" />
      <span>{userLevel}</span>
    </div>
  );
};

export default CrownLevel;

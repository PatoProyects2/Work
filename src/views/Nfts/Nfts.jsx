import { NavLink } from "react-router-dom";
import RoadMap from "./components/RoadMap/RoadMap";

const Nfts = () => {
  return (
    <div className="text-white">
      <h1 className="text-center heading-black text-capitalize mt-5">NFTs</h1>
      <RoadMap />

      <div className="d-flex justify-content-center">
        <NavLink to="/rps" className="DoubleOrNothing">
          DOUBLE OR NOTHING
        </NavLink>
      </div>
    </div>
  );
};

export default Nfts;

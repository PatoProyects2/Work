import { useNavigate } from "react-router-dom";
import RoadMap from "./components/RoadMap/RoadMap";

const Nfts = () => {
  const navigate = useNavigate();
  return (
    <div className="text-white">
      <h1 className="text-center heading-black text-capitalize mt-5">NFTs</h1>
      <RoadMap />

      <div className="d-flex justify-content-center">
        <button className="DoubleOrNothing" onClick={() => navigate("/rps")}>
          DOUBLE OR NOTHING
        </button>
      </div>
    </div>
  );
};

export default Nfts;

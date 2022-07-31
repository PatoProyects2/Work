import { useEffect, useContext } from "react";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  where,
} from "firebase/firestore";
import { db } from "../../config/firesbaseConfig";
import { Context } from "../../context/Context";

export const useAllGames = () => {
  const { setLiveGames } = useContext(Context);
  // const [allGames, setAllGames] = useState(false);
  useEffect(() => {
    console.log("Reading useAllGames");
    const q = query(
      collection(db, "allGames"),
      where("state", "==", "confirmed"),
      orderBy("createdAt", "desc"),
    );
    const unsub = onSnapshot(q, async (doc) => {
      const games = doc.docs.map((document) => document.data());
      // setAllGames(games);
      setLiveGames(games);
    });
    return () => unsub();
  }, []);

  return;
};

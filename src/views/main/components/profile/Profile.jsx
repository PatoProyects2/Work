import React, { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useOutletContext } from 'react-router-dom'
import { Button, Modal, ModalBody, ModalFooter, FormGroup } from 'reactstrap'
import { getDocs, query, where, collection, limit } from "firebase/firestore";
import { auth, db } from '../../../../firebase/firesbaseConfig'
export default function Profile() {
  const [user] = useAuthState(auth)
  const [theme, setTheme] = useOutletContext();

  const [account0, setAccount0] = useState('');
  const [account1, setAccount1] = useState('');
  const [account2, setAccount2] = useState('');
  const [globalUserGames, setGlobalUserGames] = useState(0);
  const [globalUserAmount, setGlobalUserAmount] = useState(0);
  const [won0, setWon0] = useState(0);
  const [won1, setWon1] = useState(0);
  const [won2, setWon2] = useState(0);
  const [loss0, setLoss0] = useState(0);
  const [loss1, setLoss1] = useState(0);
  const [loss2, setLoss2] = useState(0);
  const [wonAmount0, setWonAmount0] = useState(0);
  const [wonAmount1, setWonAmount1] = useState(0);
  const [wonAmount2, setWonAmount2] = useState(0);
  const [lossAmount0, setLossAmount0] = useState(0);
  const [lossAmount1, setLossAmount1] = useState(0);
  const [lossAmount2, setLossAmount2] = useState(0);
  const [streak0, setStreak0] = useState(0);
  const [streak1, setStreak1] = useState(0);
  const [streak2, setStreak2] = useState(0);
  const [rock0, setRock0] = useState(0);
  const [rock1, setRock1] = useState(0);
  const [rock2, setRock2] = useState(0);
  const [paper0, setPaper0] = useState(0);
  const [paper1, setPaper1] = useState(0);
  const [paper2, setPaper2] = useState(0);
  const [scissors0, setScissors0] = useState(0);
  const [scissors1, setScissors1] = useState(0);
  const [scissors2, setScissors2] = useState(0);
  const [rpsStats, setRpsStats] = useState(undefined);
  const [rpsAchievements, setRpsAchievements] = useState(undefined);


  useEffect(() => {
    loadMainProfile()
  }, []);

  const loadMainProfile = async () => {
    try {
      const userCollection = collection(db, "rpsUsers")
      const queryStreakBlock = query(userCollection, where("uid", "==", user.uid), limit(3))
      const queryDocuments = await getDocs(queryStreakBlock)
      const queryData = queryDocuments._snapshot.docChanges
      let totalGames0 = 0
      let totalGames1 = 0
      let totalGames2 = 0
      let totalAmount0 = 0
      let totalAmount1 = 0
      let totalAmount2 = 0
      try {
        const data0 = queryData[0].doc.data.value.mapValue.fields
        if (data0 !== undefined) {
          setAccount0(data0.account.stringValue)
          setWon0(data0.gameWon.integerValue)
          setLoss0(data0.gameLoss.integerValue)
          setWonAmount0(data0.amountWon.integerValue)
          setLossAmount0(data0.amountLoss.integerValue)
          setStreak0(data0.winStreak.integerValue)
          setRock0(data0.rock.integerValue)
          setPaper0(data0.paper.integerValue)
          setScissors0(data0.scissors.integerValue)
          totalGames0 = parseInt(data0.gameWon.integerValue) + parseInt(data0.gameLoss.integerValue)
          totalAmount0 = parseInt(data0.amountWon.integerValue) + parseInt(data0.amountLoss.integerValue)
        }
      } catch (e) {

      }
      try {
        const data1 = queryData[1].doc.data.value.mapValue.fields
        if (data1 !== undefined) {
          setAccount1(data1.account.stringValue)
          setWon1(data1.gameWon.integerValue)
          setLoss1(data1.gameLoss.integerValue)
          setWonAmount1(data1.amountWon.integerValue)
          setLossAmount1(data1.amountLoss.integerValue)
          setStreak1(data1.winStreak.integerValue)
          setRock1(data1.rock.integerValue)
          setPaper1(data1.paper.integerValue)
          setScissors1(data1.scissors.integerValue)
          totalGames1 = (parseInt(data1.gameWon.integerValue) + parseInt(data1.gameLoss.integerValue))
          totalAmount0 = parseInt(data1.amountWon.integerValue) + parseInt(data1.amountLoss.integerValue)
        }
      } catch (e) {

      }
      try {
        const data2 = queryData[2].doc.data.value.mapValue.fields
        if (data2 !== undefined) {
          setAccount2(data2.account.stringValue)
          setWon2(data2.gameWon.integerValue)
          setLoss2(data2.gameLoss.integerValue)
          setWonAmount2(data2.amountWon.integerValue)
          setLossAmount2(data2.amountLoss.integerValue)
          setStreak2(data2.winStreak.integerValue)
          setRock2(data2.rock.integerValue)
          setPaper2(data2.paper.integerValue)
          setScissors2(data2.scissors.integerValue)
          totalGames2 = (parseInt(data2.gameWon.integerValue) + parseInt(data2.gameLoss.integerValue))
          totalAmount0 = parseInt(data2.amountWon.integerValue) + parseInt(data2.amountLoss.integerValue)
        }
      } catch (e) {

      }
      let globalGames = totalGames0 + totalGames1 + totalGames2
      setGlobalUserGames(globalGames)
      let globalAmount = totalAmount0 + totalAmount1 + totalAmount2
      setGlobalUserAmount(globalAmount)
    } catch (e) {

    }
  }

  const rpsModalStats = () => {
    if (rpsStats) {
      setRpsStats(false)
    } else {
      setRpsStats(true)
    }
  }

  const rpsModalAchievement = () => {
    if (rpsAchievements) {
      setRpsAchievements(false)
    } else {
      setRpsAchievements(true)
    }
  }

  return (
    <>
      <h1>PROFILE</h1>
      <p><img src={user.photoURL} alt="" /></p>
      <p>{"NAME: " + user.displayName}</p>
      <p>{"EMAIL: " + user.email}{user.emailVerified ? " VERIFIED" : " PLEASE VERIFY YOUR EMAIL"}</p>
      <button onClick={rpsModalStats}>RPS STATS</button>
      <button onClick={rpsModalAchievement}>RPS ACHIEVEMENTS</button>
      <Modal isOpen={rpsStats} contentClassName={theme === 'dark' ? 'dark dark-border' : ''} size="xl">
        <ModalBody>
          <h3 className="text-center">RPS STATS</h3>
          <FormGroup className="pt-3 text-center">
            {globalUserGames + " games played"}
            <br></br>
            {globalUserAmount + " matic played"}
          </FormGroup>
          <FormGroup className="pt-3 text-center">
            {account0 !== '' ? <>
              {"Wallet 1: " + account0.substring(0, 5) + "..." + account0.substring(12, 16) + " | " + won0 + " won | " + loss0 + " loss | " + wonAmount0 + " matic won | " + lossAmount0 + "  matic loss"}
              {" | " + rock0 + " times rock | " + paper0 + " times paper | " + scissors0 + " times scissors | " + streak0 + " top win streak"}
            </> : ""}
            <br></br>
            {account1 !== '' ? <>
              {"Wallet 2: " + account1.substring(0, 5) + "..." + account1.substring(12, 16) + " | " + won1 + " won | " + loss1 + " loss | " + wonAmount1 + " matic won | " + lossAmount1 + "  matic loss"}
              {" | " + rock1 + " times rock | " + paper1 + " times paper | " + scissors1 + " times scissors | " + streak1 + " top win streak"}
            </> : ""}
            <br></br>
            {account2 !== '' ? <>
              {"Wallet 3: " + account2.substring(0, 5) + "..." + account2.substring(12, 16) + " | " + won2 + " won | " + loss2 + " loss | " + wonAmount2 + " matic won | " + lossAmount2 + "  matic loss"}
              {" | " + rock2 + " times rock | " + paper2 + " times paper | " + scissors2 + " times scissors | " + streak2 + " top win streak"}
            </> : ""}
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={rpsModalStats}>CLOSE</Button>
        </ModalFooter>
      </Modal >
      <Modal isOpen={rpsAchievements} contentClassName={theme === 'dark' ? 'dark dark-border' : ''} size="xl">
        <ModalBody>
          <h3 className="text-center">RPS ACHIEVEMENTS</h3>
          <FormGroup className="pt-3 text-center">

          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={rpsModalAchievement}>CLOSE</Button>
        </ModalFooter>
      </Modal>




    </>
  );
}
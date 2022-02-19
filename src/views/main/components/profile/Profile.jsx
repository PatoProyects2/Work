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
  const [account3, setAccount3] = useState('');
  const [totalGames0, setTotalGames0] = useState(0);
  const [totalGames1, setTotalGames1] = useState(0);
  const [totalGames2, setTotalGames2] = useState(0);
  const [totalGames3, setTotalGames3] = useState(0);
  const [won0, setWon0] = useState(0);
  const [won1, setWon1] = useState(0);
  const [won2, setWon2] = useState(0);
  const [won3, setWon3] = useState(0);
  const [wonAmount0, setWonAmount0] = useState(0);
  const [wonAmount1, setWonAmount1] = useState(0);
  const [wonAmount2, setWonAmount2] = useState(0);
  const [wonAmount3, setWonAmount3] = useState(0);
  const [lossAmount0, setLossAmount0] = useState(0);
  const [lossAmount1, setLossAmount1] = useState(0);
  const [lossAmount2, setLossAmount2] = useState(0);
  const [lossAmount3, setLossAmount3] = useState(0);
  const [totalAmount0, setTotalAmount0] = useState(0);
  const [totalAmount1, setTotalAmount1] = useState(0);
  const [totalAmount2, setTotalAmount2] = useState(0);
  const [totalAmount3, setTotalAmount3] = useState(0);
  const [loss0, setLoss0] = useState(0);
  const [loss1, setLoss1] = useState(0);
  const [loss2, setLoss2] = useState(0);
  const [loss3, setLoss3] = useState(0);
  const [streak0, setStreak0] = useState(0);
  const [streak1, setStreak1] = useState(0);
  const [streak2, setStreak2] = useState(0);
  const [streak3, setStreak3] = useState(0);
  const [level0, setLevel0] = useState(0);
  const [level1, setLevel1] = useState(0);
  const [level2, setLevel2] = useState(0);
  const [level3, setLevel3] = useState(0);
  const [totalLevel, setTotalLevel] = useState(0);
  const [rpsInfo, setRpsInfo] = useState(undefined);

  useEffect(() => {
    loadMainProfile()
  }, []);

  const loadMainProfile = async () => {
    const userCollection = collection(db, "rpsUsers")
    const queryStreakBlock = query(userCollection, where("uid", "==", user.uid))
    const queryDocuments = await getDocs(queryStreakBlock)
    const queryData = queryDocuments._snapshot.docChanges
    try {
      const data0 = queryData[0].doc.data.value.mapValue.fields
      if (data0 !== undefined) {
        setWon0(parseInt(data0.gameWon.integerValue))
        setLoss0(parseInt(data0.gameLoss.integerValue))
        setTotalGames0(parseInt(data0.gameWon.integerValue) + parseInt(data0.gameLoss.integerValue))
        setWonAmount0(parseInt(data0.amountWon.integerValue))
        setLossAmount0(parseInt(data0.amountLoss.integerValue))
        setTotalAmount0(parseInt(data0.amountWon.integerValue) + parseInt(data0.amountLoss.integerValue))
        setStreak0(data0.winStreak.integerValue)
        setLevel0(data0.level.integerValue)
        setAccount0(data0.account.stringValue)
        setTotalLevel(parseInt(data0.level.integerValue) * 5)
      }
      const data1 = queryData[1].doc.data.value.mapValue.fields
      if (data1 !== undefined) {
        setWon1(parseInt(data1.gameWon.integerValue))
        setLoss1(parseInt(data1.gameLoss.integerValue))
        setTotalGames1(parseInt(data1.gameWon.integerValue) + parseInt(data1.gameLoss.integerValue))
        setWonAmount1(parseInt(data1.amountWon.integerValue))
        setLossAmount1(parseInt(data1.amountLoss.integerValue))
        setTotalAmount1(parseInt(data1.amountWon.integerValue) + parseInt(data1.amountLoss.integerValue))
        setStreak1(data1.winStreak.integerValue)
        setLevel1(data1.level.integerValue)
        setAccount1(data1.account.stringValue)
        setTotalLevel(parseInt((data0.level.integerValue) + parseInt(data1.level.integerValue)) * 5)
      }
      const data2 = queryData[2].doc.data.value.mapValue.fields
      if (data2 !== undefined) {
        setWon2(parseInt(data2.gameWon.integerValue))
        setLoss2(parseInt(data2.gameLoss.integerValue))
        setTotalGames2(parseInt(data2.gameWon.integerValue) + parseInt(data2.gameLoss.integerValue))
        setWonAmount2(parseInt(data2.amountWon.integerValue))
        setLossAmount2(parseInt(data2.amountLoss.integerValue))
        setTotalAmount2(parseInt(data2.amountWon.integerValue) + parseInt(data2.amountLoss.integerValue))
        setStreak2(data2.winStreak.integerValue)
        setLevel2(data2.level.integerValue)
        setAccount2(data2.account.stringValue)
        setTotalLevel(parseInt((data0.level.integerValue) + parseInt(data1.level.integerValue) + parseInt(data2.level.integerValue)) * 5)
      }
      const data3 = queryData[3].doc.data.value.mapValue.fields
      if (data3 !== undefined) {
        setWon3(parseInt(data3.gameWon.integerValue))
        setLoss3(parseInt(data3.gameLoss.integerValue))
        setTotalGames3(parseInt(data3.gameWon.integerValue) + parseInt(data3.gameLoss.integerValue))
        setWonAmount3(parseInt(data3.amountWon.integerValue))
        setLossAmount3(parseInt(data3.amountLoss.integerValue))
        setTotalAmount3(parseInt(data3.amountWon.integerValue) + parseInt(data3.amountLoss.integerValue))
        setStreak3(data3.winStreak.integerValue)
        setLevel3(data3.level.integerValue)
        setAccount3(data3.account.stringValue)
        setTotalLevel(parseInt((data0.level.integerValue) + parseInt(data1.level.integerValue) + parseInt(data2.level.integerValue) + parseInt(data3.level.integerValue)) * 5)
      }
    } catch (e) {

    }
  }

  const rpsModalInfo = () => {
    if (rpsInfo) {
      setRpsInfo(false)
    } else {
      setRpsInfo(true)
    }
  }

  return (
    <>
      <h1>PROFILE</h1>
      <p><img src={user.photoURL} alt="" /></p>
      <p>
        {totalLevel.toFixed() < 50 ? <> {"VIP: 1"} <br></br>{totalLevel.toFixed() + "/" + 50 + " XP"} </> : ""}
        {totalLevel.toFixed() > 49 && totalLevel.toFixed() < 300 ? <> {"VIP: 2"} <br></br>{totalLevel.toFixed() + "/" + 300 + " XP"} </> : ""}
        {totalLevel.toFixed() > 299 && totalLevel.toFixed() < 2500 ? <> {"VIP: 3"} <br></br>{totalLevel.toFixed() + "/" + 2500 + " XP"} </> : ""}
        {totalLevel.toFixed() > 2499 && totalLevel.toFixed() < 7000 ? <> {"VIP: 4"} <br></br>{totalLevel.toFixed() + "/" + 7000 + " XP"} </> : ""}
        {totalLevel.toFixed() > 6599 && totalLevel.toFixed() < 20000 ? <> {"VIP: 5"} <br></br>{totalLevel.toFixed() + "/" + 20000 + " XP"} </> : ""}
        {totalLevel.toFixed() > 19999 && totalLevel.toFixed() < 50000 ? "VIP: 6 (MAX. VIP)" : ""}
      </p>
      <p>{"NAME: " + user.displayName}</p>
      <p>{"EMAIL: " + user.email}{user.emailVerified ? " VERIFIED" : " PLEASE VERIFY YOUR EMAIL"}</p>

      <button onClick={rpsModalInfo}>RPS STATS</button>
      <Modal isOpen={rpsInfo} contentClassName={theme === 'dark' ? 'dark dark-border' : ''} size="md">
        <ModalBody>
          <FormGroup className="pt-3 text-center">
            <h4 className="text-center">ACCOUNTS</h4>
            <p>{totalGames0 === 0 && totalGames1 === 0 && totalGames2 === 0 && totalGames3 === 0 ? "No account detected, play RPS game" : ""}</p>
            <p>{totalGames0 !== 0 ? "Account 1: " + account0 + " Total Games: " + totalGames0 + " Games Won: " + won0 + " Games Loss: " + loss0 + " Top Win Streak: " + streak0 + " Level: " + level0 + " Total Amount: " + totalAmount0 + " Amount Won: " + wonAmount0 + " Amount Loss: " + lossAmount0 : ""}</p>
            <p>{totalGames1 !== 0 ? "Account 2: " + account1 + " Total Games: " + totalGames1 + " Games Won: " + won1 + " Games Loss: " + loss1 + " Top Win Streak: " + streak1 + " Level: " + level1 + " Total Amount: " + totalAmount1 + " Amount Won: " + wonAmount1 + " Amount Loss: " + lossAmount1 : ""}</p>
            <p>{totalGames2 !== 0 ? "Account 3: " + account2 + " Total Games: " + totalGames2 + " Games Won: " + won2 + " Games Loss: " + loss2 + " Top Win Streak: " + streak2 + " Level: " + level2 + " Total Amount: " + totalAmount2 + " Amount Won: " + wonAmount2 + " Amount Loss: " + lossAmount2 : ""}</p>
            <p>{totalGames3 !== 0 ? "Account 4: " + account3 + " Total Games: " + totalGames3 + " Games Won: " + won3 + " Games Loss: " + loss3 + " Top Win Streak: " + streak3 + " Level: " + level3 + " Total Amount: " + totalAmount3 + " Amount Won: " + wonAmount3 + " Amount Loss: " + lossAmount3 : ""}</p>
          </FormGroup>
          <FormGroup className="text-center">
            <h4 className="text-center">ACHIEVEMENTS</h4>
            <p>PLAY WITH ROCK 500 TIMES: <small>NOT ACHIEVED</small></p>
            <p>PLAY IN DIFERENTS NETWORKS: <small>NOT ACHIEVED</small></p>
            <p>PLAY WITH DIFERENTS WALLETS: <small>NOT ACHIEVED</small></p>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={rpsModalInfo}>CLOSE</Button>
        </ModalFooter>
      </Modal>




    </>
  );
}
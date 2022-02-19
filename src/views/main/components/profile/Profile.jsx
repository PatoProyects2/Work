import React, { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useOutletContext } from 'react-router-dom'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Button, Modal, ModalBody, ModalFooter, FormGroup, Input, Label } from 'reactstrap'
import { getDocs, query, where, collection } from "firebase/firestore";
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
        const won0 = parseInt(data0.won.integerValue)
        const loss0 = parseInt(data0.loss.integerValue)
        setWon0(won0)
        setLoss0(loss0)
        setTotalGames0(won0 + loss0)
        setStreak0(data0.winStreak.integerValue)
        setLevel0(data0.level.integerValue)
        setAccount0(data0.account.stringValue)
        setTotalLevel(parseInt(data0.level.integerValue) * 5)
      }
      const data1 = queryData[1].doc.data.value.mapValue.fields
      if (data1 !== undefined) {
        const won1 = parseInt(data1.won.integerValue)
        const loss1 = parseInt(data1.loss.integerValue)
        setWon1(won1)
        setLoss1(loss1)
        setTotalGames1(won1 + loss1)
        setStreak1(data1.winStreak.integerValue)
        setLevel1(data1.level.integerValue)
        setAccount1(data1.account.stringValue)
        setTotalLevel(parseInt((data0.level.integerValue) + parseInt(data1.level.integerValue)) * 5)
      }
      const data2 = queryData[2].doc.data.value.mapValue.fields
      if (data2 !== undefined) {
        const won2 = parseInt(data2.won.integerValue)
        const loss2 = parseInt(data2.loss.integerValue)
        setWon2(won2)
        setLoss2(loss2)
        setTotalGames2(won2 + loss2)
        setStreak2(data2.winStreak.integerValue)
        setLevel2(data2.level.integerValue)
        setAccount2(data2.account.stringValue)
        setTotalLevel(parseInt((data0.level.integerValue) + parseInt(data1.level.integerValue) + parseInt(data2.level.integerValue)) * 5)
      }
      const data3 = queryData[3].doc.data.value.mapValue.fields
      if (data3 !== undefined) {
        const won3 = parseInt(data3.won.integerValue)
        const loss3 = parseInt(data3.loss.integerValue)
        setWon3(won3)
        setLoss3(loss3)
        setTotalGames3(won3 + loss3)
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
        {totalLevel.toFixed(0) < 50 ? "VIP: 1" : ""}
        {totalLevel.toFixed(0) > 49 && totalLevel.toFixed(0) < 300 ? <> {"VIP: 2"} <br></br>{Math.round(300 - totalLevel) + "/" + 300 + " XP"} </> : ""}
        {totalLevel.toFixed(0) > 299 && totalLevel.toFixed(0) < 2500 ? <> {"VIP: 3"} <br></br>{Math.round(2500 - totalLevel) + "/" + 2500 + " XP"} </> : ""}
        {totalLevel.toFixed(0) > 2499 && totalLevel.toFixed(0) < 7000 ? <> {"VIP: 4"} <br></br>{Math.round(7000 - totalLevel) + "/" + 7000 + " XP"} </> : ""}
        {totalLevel.toFixed(0) > 6599 && totalLevel.toFixed(0) < 20000 ? <> {"VIP: 5"} <br></br>{Math.round(20000 - totalLevel) + "/" + 20000 + " XP"} </> : ""}
        {totalLevel.toFixed(0) > 19999 && totalLevel.toFixed(0) < 50000 ? "VIP: 6 (MAX. VIP)" : ""}
      </p>
      <p>{"NAME: " + user.displayName}</p>
      <p>{"EMAIL: " + user.email}{user.emailVerified ? " VERIFIED" : " PLEASE VERIFY YOUR EMAIL"}</p>

      <button onClick={rpsModalInfo}>RPS STATS</button>
      <Modal isOpen={rpsInfo} contentClassName={theme === 'dark' ? 'dark dark-border' : ''} size="md">
        <ModalBody>
          <FormGroup className="pt-3 text-center">
            <h4 className="text-center">ACCOUNTS</h4>
            <p>{totalGames0 !== 0 ? "Account 1: " + account0 + " Games: " + totalGames0 + " Wons: " + won0 + " Loss: " + loss0 + " Win Streak: " + streak0 + " Level: " + level0 : ""}</p>
            <p>{totalGames1 !== 0 ? "Account 2: " + account1 + " Games: " + totalGames1 + " Wons: " + won1 + " Loss: " + loss1 + " Win Streak: " + streak1 + " Level: " + level1 : ""}</p>
            <p>{totalGames2 !== 0 ? "Account 3: " + account2 + " Games: " + totalGames2 + " Wons: " + won2 + " Loss: " + loss2 + " Win Streak: " + streak2 + " Level: " + level2 : ""}</p>
            <p>{totalGames3 !== 0 ? "Account 4: " + account3 + " Games: " + totalGames3 + " Wons: " + won3 + " Loss: " + loss3 + " Win Streak: " + streak3 + " Level: " + level3 : ""}</p>
          </FormGroup>
          <FormGroup className="text-center">
            <h4 className="text-center">ACHIEVEMENTS</h4>
            <p>PLAY WITH ROCK 500 TIMES: <small>ACHIEVED</small></p>
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
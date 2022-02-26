import React, { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { sendEmailVerifications } from 'firebase/auth';
import { useOutletContext } from 'react-router-dom'
import { Button, Modal, ModalBody, ModalFooter, FormGroup, Input } from 'reactstrap'
import { query, where, collection, limit, onSnapshot } from "firebase/firestore";
import { auth, db } from '../../../../firebase/firesbaseConfig'
import Stats from './Stats'
export default function Profile() {
  const [userInfo, setUserInfo] = useState({
    displayName: '',
    photoURL: 'https://ipfs.io/ipfs/QmP7jTCiimXHJixUNAVBkb7z7mCZQK3vwfFiULf5CgzUDh'
  });
  const [user] = useAuthState(auth)
  const [theme, setTheme] = useOutletContext();
  const [log0, setLog0] = useState('')
  const [rpsStats, setRpsStats] = useState(undefined);
  const [rpsAchievements, setRpsAchievements] = useState(undefined);
  const [editProfile, setEditProfile] = useState(undefined);
  const [userData, setUserData] = useState({});

  const handleInputChange = (event) => {
    setUserInfo({
      ...userInfo,
      [event.target.name]: event.target.value
    });
  }

  useEffect(() => {
    readUserClubData(user)
  }, [user])

  const readUserClubData = (user) => {
    if (user) {
      const q = query(collection(db, "clubUsers"), where("uid", "==", user.uid), limit(3))
      const unsub = onSnapshot(q, (doc) => {
        const clubData = doc.docs.map(userData => userData.data())
        setUserData(clubData)
      });
      return unsub;
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
  const resendEmailVerification = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        window.alert('Email sent')
      })
      .catch((error) => {
        window.alert('Wait some time to resend email verification again')
      });
  }
  const editProfileModal = () => {
    if (editProfile) {
      setEditProfile(false)
    } else {
      setEditProfile(true)
    }
  }
  const updateUserProfile = () => {
    if (userInfo.displayName.length >= 4 && userInfo.displayName.length <= 12) {
      setLog0('')
      updateProfile(auth.currentUser, userInfo)
        .then(() => {
          setEditProfile(false)
        }).catch((error) => {
          setLog0('Inavlid Username')
        });
    } else {
      setLog0('Username 4-12 characters')
    }
  }

  return (
    <>
      {user ?
        <>
          <h1>Profile</h1>
          <p><img width="150" height="150" src={user.photoURL} alt="" /></p>
          <p>{user.displayName !== '' ? "Username: " + user.displayName : "User"}</p>
          <p>{"E-mail: " + user.email}{user.emailVerified ? " VERIFIED" : <>{" NOT VERIFIED"} <button onClick={resendEmailVerification}>Resend email verification</button></>}</p>
          <Button color="primary" onClick={editProfileModal}>Edit Profile</Button>
          <Button color="secondary" onClick={rpsModalStats}>RPS Stats</Button>
          <Button color="secondary" onClick={rpsModalAchievement}>RPS Achievements</Button>

          <Modal isOpen={rpsStats} contentClassName={theme === 'dark' ? 'dark dark-border' : ''} size="xl">
            <ModalBody>
              <h3 className="text-center">RPS Stats</h3>
              <button type="button" className="btn-close" aria-label="Close" onClick={rpsModalStats}></button>
              <FormGroup className="pt-3 text-center">
                <Stats
                  userData={userData}
                />
              </FormGroup>
            </ModalBody>
          </Modal >

          <Modal isOpen={rpsAchievements} contentClassName={theme === 'dark' ? 'dark dark-border' : ''} size="xl">
            <ModalBody>
              <h3 className="text-center">RPS Achievements</h3>
              <button type="button" className="btn-close" aria-label="Close" onClick={rpsModalAchievement}></button>
              <FormGroup className="pt-3 text-center">
              </FormGroup>
            </ModalBody>
          </Modal>
          <Modal isOpen={editProfile} contentClassName={theme === 'dark' ? 'dark dark-border' : ''} size="sm">
            {log0 && (<span className="alert alert-danger mx-5 row justify-content-center mt-2">{log0}</span>)}
            <ModalBody>
              <h4 className="text-center">USER PROFILE</h4>
              <button type="button" className="btn-close" aria-label="Close" onClick={editProfileModal}></button>
              <FormGroup className="pt-3 text-center">
                <img width="105" height="105" className="rounded-circle" alt="" src="https://ipfs.io/ipfs/QmP7jTCiimXHJixUNAVBkb7z7mCZQK3vwfFiULf5CgzUDh" />
              </FormGroup>
              <FormGroup>
                <Input name="displayName" placeholder="Username" onChange={handleInputChange} defaultValue={user.displayName} type="text" />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="warning" type="submit" onClick={updateUserProfile}>Save</Button>
            </ModalFooter>
          </Modal>
        </>
        :
        "PLEASE SIGN IN"
      }
    </>
  );
}
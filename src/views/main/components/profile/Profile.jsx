import React, { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { sendEmailVerification, updateProfile } from 'firebase/auth';
import { Button, Modal, ModalBody, ModalFooter, FormGroup, Input } from 'reactstrap'
import { toast } from 'react-hot-toast';
import { query, where, collection, limit, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { auth, db } from '../../../../firebase/firesbaseConfig'
import Stats from './Stats'
export default function Profile() {
  const [userInfo, setUserInfo] = useState({
    displayName: '',
    photoURL: 'https://ipfs.io/ipfs/QmP7jTCiimXHJixUNAVBkb7z7mCZQK3vwfFiULf5CgzUDh'
  });
  const [user] = useAuthState(auth)
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
  const resendEmailVerification = () => {
    toast.promise(
      sendEmailVerification(auth.currentUser),
      {
        loading: 'Sending...',
        success: <b>Email sent to your inbox</b>,
        error: <b>Wait a few minutes to resend the email verification</b>,
      })
  }
  const editProfileModal = () => {
    if (editProfile) {
      setEditProfile(false)
    } else {
      setEditProfile(true)
    }
  }
  const updateUserProfile = () => {
    if (userData[0]) {
      if (userInfo.displayName.length >= 4 && userInfo.displayName.length <= 12) {
        toast.promise(
          updateDoc(doc(db, "clubUsers", userData[0].account), {
            name: userInfo.displayName
          }),
          {
            loading: 'Updating...',
            success: <b>Profile updated</b>,
            error: <b>Profile not updated</b>,
          })
          .then(() => setEditProfile(false))
      } else {
        toast.error("The name must be between 4 and 12 characters")
        return false
      }
    } else {
      if (userInfo.displayName.length >= 4 && userInfo.displayName.length <= 12) {
        updateProfile(auth.currentUser, userInfo)
          .then(() => {
            setEditProfile(false)
          }).catch((error) => {
            toast.error("Invalid Username")
          });
      } else {
        toast.error("The name must be between 4 and 12 characters")
        return false
      }
    }
  }

  return (
    <>
      {user ?
        <>
          <h1>Profile</h1>
          {userData[0] ?
            <>
              <p>{userData[0].photo && <img width="150" height="150" className="rounded-circle me-2" src={userData[0].photo} alt="" />}</p>
              <p>{userData[0].name}</p>
            </>
            :
            <>
              <p> <img width="150" height="150" className="rounded-circle me-2" src="https://gateway.ipfs.io/ipfs/QmP7jTCiimXHJixUNAVBkb7z7mCZQK3vwfFiULf5CgzUDh" alt="" /></p>
              <p>{user.displayName ? user.displayName : "ClubUser"}</p>
            </>
          }
          <p>
            {user.email}
            {user.emailVerified ?
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-check" viewBox="0 0 16 16">
                <path
                  d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"
                />
              </svg>
              :
              <button onClick={resendEmailVerification}>
                Resend email verification
              </button>
            }
          </p>
          <Button color="primary" onClick={editProfileModal}>Edit Profile</Button>
          <Modal isOpen={editProfile} className="d-modal" size="sm">
            <ModalBody>
              <h4 className="text-center">Profile</h4>
              <button type="button" className="btn-close" aria-label="Close" onClick={editProfileModal}></button>
              <FormGroup className="pt-3 text-center">
                <p>
                  {userData[0] ?
                    <img width="105" height="105" className="rounded-circle me-2" src={userData[0].photo} alt="" />
                    :
                    <img width="150" height="150" className="rounded-circle me-2" src="https://gateway.ipfs.io/ipfs/QmP7jTCiimXHJixUNAVBkb7z7mCZQK3vwfFiULf5CgzUDh" alt="" />
                  }
                </p>
              </FormGroup>
              <FormGroup>
                {userData[0] ?
                  <Input name="displayName" className="d-modal-input" onChange={handleInputChange} defaultValue={userData[0].name} type="text" />
                  :
                  <Input name="displayName" className="d-modal-input" placeholder="ClubUser" onChange={handleInputChange} defaultValue={user.displayName} type="text" />
                }
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="warning" type="submit" onClick={updateUserProfile}>Save</Button>
            </ModalFooter>
          </Modal>
          <Stats
            userData={userData}
          />
        </>
        :
        "PLEASE SIGN IN"
      }
    </>
  );
}
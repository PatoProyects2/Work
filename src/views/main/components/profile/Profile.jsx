import React, { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { sendEmailVerification, updateProfile } from 'firebase/auth';
import { Button, FormGroup, Input, Row, Col, Card, CardImg, CardBody, CardTitle, Label, Modal, ModalBody } from 'reactstrap'
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
  const [userData, setUserData] = useState({});
  const [nftPicture, setNftPicture] = useState(false);

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
      } else {
        toast.error("The name must be between 4 and 12 characters")
        return false
      }
    } else {
      if (userInfo.displayName.length >= 4 && userInfo.displayName.length <= 12) {
        toast.promise(
          updateProfile(auth.currentUser, userInfo)
            .catch((error) => {
              toast.error("Invalid Username")
            }),
          {
            loading: 'Updating...',
            success: <b>Profile updated</b>,
            error: <b>Profile not updated</b>,
          })
      } else {
        toast.error("The name must be between 4 and 12 characters")
        return false
      }
    }
  }

  const selectPicture = () => {
    if (userData[0].level > 4) {
      if (nftPicture) {
        setNftPicture(false)
      } else {
        setNftPicture(true)
      }
    } else {
      toast.error("You need level 5 to unlock this function")
    }
  }

  return (
    <div className="container">
      {user ?
        <>
          <Row>
            <Col lg="6" className="mx-auto">
              <Card className='profile-card'>
                <CardBody>
                  <CardTitle className="text-center profile-title" tag="h2">
                    Profile
                  </CardTitle>
                  <CardImg
                    alt={userData[0] ? userData[0].name : user.displayName ? user.displayName : "ClubUser"}
                    className="rounded-circle profile-img"
                    src={(userData[0] && userData[0].photo) ? userData[0].photo : "https://gateway.ipfs.io/ipfs/QmP7jTCiimXHJixUNAVBkb7z7mCZQK3vwfFiULf5CgzUDh"}
                    top
                  />
                  <FormGroup floating>
                    {userData[0] ? <Button onClick={selectPicture} color="danger" type="button" className="mt-3">Select NFT</Button> : ""}
                  </FormGroup>
                  <FormGroup floating>
                    <Input id="displayName" name="displayName" className="d-modal-input"
                      placeholder="ClubUser" onChange={handleInputChange} type="text" defaultValue={userData[0] ? userData[0].name : user.displayName} />
                    <Label for="displayName">Username</Label>
                  </FormGroup>
                  <FormGroup floating>
                    <Input id="email" name="email" className={`d-modal-input ${user.emailVerified ? "is-valid" : "is-invalid"}`}
                      type="email" defaultValue={user.email} disabled />
                    <Label for="email">Email</Label>
                    {!user.emailVerified &&
                      <Button color="primary" type="button" className="mt-3" onClick={resendEmailVerification}>Resend email verification</Button>
                    }
                  </FormGroup>
                  <FormGroup className="d-flex justify-content-end">
                    <Button color="warning" type="submit" onClick={updateUserProfile}>Save</Button>
                  </FormGroup>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Modal isOpen={nftPicture} className="d-modal" size="lg">
            <ModalBody>
              <div className='d-flex justify-content-end'>
                <button type="button" className="btn-close" aria-label="Close" onClick={selectPicture}></button>
              </div>
              <h4 className="text-center">NFT Picture</h4>
              <FormGroup className="pt-3 text-center">
                {/* DETECTAR SI LA WALLET QUE SE CONECTA HA MINTEADO EL NFT DESDE EL SMART CONTRACT*/}
              </FormGroup>
            </ModalBody>
          </Modal>
          <Stats userData={userData} />
        </>
        :
        <h2 className='text-center'>PLEASE LOG IN OR SIGN UP</h2>
      }
    </div>
  );
}
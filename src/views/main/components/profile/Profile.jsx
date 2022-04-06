import React, { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { sendEmailVerification, updateProfile, updateEmail } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Button, FormGroup, Input, Row, Col, Card, CardImg, CardBody, CardTitle, Label, Progress, Modal, ModalBody } from 'reactstrap'
import { toast } from 'react-hot-toast';
import { query, where, collection, limit, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { auth, db, storage } from '../../../../firebase/firesbaseConfig'
import Stats from './Stats'
import FileUploader from './FileUploader';
import Chart from './Chart'

export default function Profile() {
  const [userInfo, setUserInfo] = useState({
    displayName: '',
    photoURL: 'https://ipfs.io/ipfs/QmP7jTCiimXHJixUNAVBkb7z7mCZQK3vwfFiULf5CgzUDh'
  });
  const [userEmail, setUserEmail] = useState({ email: '' });
  const [user] = useAuthState(auth)
  const [userData, setUserData] = useState({});
  const [nftPicture, setNftPicture] = useState(false);
  const [name, setName] = useState('ClubUser');
  const [log, setLog] = useState('');
  const [uploadValue, setUploadValue] = useState(0);
  const [picture, setPicture] = useState(null);

  const handleInputUpload = (event) => {
    const file = event.target.files[0]
    if (file.type === 'image/png' || file.type === 'image/jpeg') {
      let reader = new FileReader();
      reader.onload = function (e) {
        setPicture(e.target.result)
      };
      reader.readAsDataURL(file)
      const storageRef = ref(storage, `profile/${auth.currentUser.uid}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadValue(progress)
          switch (snapshot.state) {
            case 'paused':
              setLog('Upload is paused');
              break;
            case 'running':
              setLog('Uploading...');
              break;
          }
        },
        (error) => {
          toast.error('File not upload')
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            if (userData[0]) {
              toast.promise(
                updateDoc(doc(db, "clubUsers", userData[0].account), { photo: downloadURL })
                  .then(() => setNftPicture(false)),
                {
                  loading: 'Updating...',
                  success: <b>Profile updated</b>,
                  error: <b>Profile not updated</b>,
                })
            } else {
              toast.promise(
                updateProfile(auth.currentUser, { photoURL: downloadURL })
                  .then(() => setNftPicture(false)),
                {
                  loading: 'Updating...',
                  success: <b>Profile updated</b>,
                  error: <b>Profile not updated</b>,
                })
            }
          });
        }
      );
    } else {
      toast.error('Invalid profile picture selected')
    }
  }

  const handleInputNameChange = (event) => {
    setUserInfo({
      ...userInfo,
      [event.target.name]: event.target.value
    })
  }

  const handleInputEmailChange = (event) => {
    setUserEmail({
      ...userEmail,
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
        if (clubData[0]) {
          setName(clubData[0].name)
        }
      });
      return () => unsub()
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
      if (userInfo.displayName.length === 0 && userEmail.email.length === 0) {
        toast.error('Invalid data')
      }
      if (userInfo.displayName.length >= 4 && userInfo.displayName.length <= 12) {
        toast.promise(
          updateDoc(doc(db, "clubUsers", userData[0].account), { name: userInfo.displayName }),
          {
            loading: 'Updating...',
            success: <b>Username updated</b>,
            error: <b>Invalid username</b>,
          })
        setUserInfo({ displayName: '' })
      }
      if (userInfo.displayName.length > 12) {
        toast.error('The username must be between 4 and 12 characters')
      }
      let re = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(userEmail.email)
      if (re) {
        toast.promise(
          updateEmail(auth.currentUser, userEmail.email),
          {
            loading: 'Updating...',
            success: <b>Email updated</b>,
            error: <b>Inavlid email</b>,
          })
        setUserEmail({ email: '' })
      }
      if (!re && userEmail.email.length > 0) {
        toast.error('Invalid email')
      }
    } else {
      if (userInfo.displayName.length >= 4 && userInfo.displayName.length <= 12) {
        toast.promise(
          updateProfile(auth.currentUser, userInfo),
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

  return (

    <>
      {user ?
        <>
          <div className="profile-container">
            <h3 className="my-3 text-center">{userData[0] ? name : user.displayName ? user.displayName : "ClubUser"} Stats</h3>
            <div className="d-flex flex-row justify-content-between align-items-center gap-5">
              <div className="profile-info-container">
                <img
                  alt={userData[0] ? name : user.displayName ? user.displayName : "ClubUser"}
                  className="rounded-circle profile-img"
                  src={(userData[0] && userData[0].photo) ? userData[0].photo : "https://gateway.ipfs.io/ipfs/QmP7jTCiimXHJixUNAVBkb7z7mCZQK3vwfFiULf5CgzUDh"} />

                <FileUploader handleChange={handleInputUpload} text="Change picture" />

                {uploadValue > 0 && uploadValue < 100 &&
                  <>
                    <Progress value={uploadValue} striped={true} animated={true} className="my-3">{`${log} ${uploadValue}%`}</Progress>
                  </>
                }

                <FormGroup floating>
                  {name !== 'ClubUser' ?
                    <>
                      <Input id="displayName" name="displayName" className="d-modal-input"
                        placeholder="ClubUser" onChange={handleInputNameChange} type="text" defaultValue={name} />
                    </>
                    :
                    <Input id="displayName" name="displayName" className="d-modal-input"
                      placeholder="ClubUser" onChange={handleInputNameChange} type="text" defaultValue={user.displayName} />
                  }
                  <Label for="displayName">Username</Label>
                </FormGroup>

                <FormGroup floating>
                  <Input id="email" name="email" className={`d-modal-input ${user.emailVerified ? "is-valid" : "is-invalid"}`}
                    type="email" onChange={handleInputEmailChange} defaultValue={user.email} />
                  <Label for="email">Email</Label>
                  {!user.emailVerified &&
                    <Button color="primary" type="button" className="mt-3" onClick={resendEmailVerification}>Resend email verification</Button>
                  }
                </FormGroup>

                <FormGroup className="d-grid my-3">
                  <Button color="warning" type="submit" onClick={updateUserProfile}>Save</Button>
                </FormGroup>
              </div>

              <div className="profile-data-container">
                <div className="profile-stats-container">
                  <Stats userData={userData} />
                </div>
                <div className="profile-chart-container">
                  <Chart userData={userData[0]} />
                </div>
              </div>
            </div>
          </div>
        </>
        :
        <h2 className='text-center mt-3'>PLEASE LOG IN OR SIGN UP</h2>
      }
    </>
  );
}
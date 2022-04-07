import React, { useState, useEffect } from 'react'
import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, setPersistence, browserSessionPersistence } from 'firebase/auth';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Button, Modal, ModalBody, ModalFooter, FormGroup, Input } from 'reactstrap'
import DiscordOauth2 from "discord-oauth2"
import { query, where, collection, limit, onSnapshot } from "firebase/firestore";
import { toast } from 'react-hot-toast';
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { auth, db } from "../../firebase/firesbaseConfig"



export default function AccountFirebase(props) {
  const [user] = useAuthState(auth)
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: ''
  });
  const [userData, setUserData] = useState({});
  const [dropdown, setDropdown] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false)
  const [signInModal, setSignInModal] = useState(false)
  const [recoveryModal, setRecoveryModal] = useState(false)

  let navigate = useNavigate();

  useEffect(() => {
    readUserClubData(user)
    return () => {
      setUserData({});
    };
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

  const toggleMenu = () => {
    setDropdown(!dropdown);
  }

  const handleInputChange = (event) => {
    setUserInfo({
      ...userInfo,
      [event.target.name]: event.target.value
    });
  }
  const modalRegister = () => {
    if (signUpModal) {
      setSignUpModal(false)
    } else {
      setRecoveryModal(false)
      setSignUpModal(true)
    }
  }
  const modalLogin = () => {
    if (signInModal) {
      setSignInModal(false)
    } else {
      setSignInModal(true)
    }
  }

  const modalRecovery = () => {
    if (signInModal) {
      setRecoveryModal(true)
      setSignInModal(false)
    } else {
      setRecoveryModal(false)
    }
  }
  const signUpWithUserPass = () => {
    if (userInfo.email.length > 0 && userInfo.password.length > 0) {

      toast.promise(
        createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password),
        {
          loading: 'Creating account...',
          success: <b>Account created</b>,
          error: <b>Email already in use</b>,
        })
        .then(() => sendEmailVerification(auth.currentUser))
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    } else {
      toast.error("Invalid email or password")
      return false
    }
  }
  const signInWithUserPass = () => {
    if (userInfo.email.length > 0 && userInfo.password.length > 0) {
      if (document.getElementById('persistence').checked === true) {
        setPersistence(auth, browserSessionPersistence)
          .then(() => {
            return toast.promise(
              signInWithEmailAndPassword(auth, userInfo.email, userInfo.password),
              {
                loading: 'Accessing account...',
                success: <b>Welcome!</b>,
                error: <b>Invalid email or password</b>,
              })
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
          });
      } else {
        toast.promise(
          signInWithEmailAndPassword(auth, userInfo.email, userInfo.password),
          {
            loading: 'Accessing account...',
            success: <b>Welcome!</b>,
            error: <b>Invalid email or password</b>,
          })
      }
    } else {
      toast.error("Invalid email or password")
      return false
    }
  }

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log("Error received => ", error, "Credential used ", credential)
      });
  }

  const recoveryPassword = () => {
    sendPasswordResetEmail(auth, userInfo.email)
      .then(() => {
        setRecoveryModal(false)
      })
      .catch((error) => {
        toast.error("Invalid email")
      });
  }

  const changeAccountModal = () => {
    if (signInModal) {
      setSignInModal(false)
      setSignUpModal(true)
    }
    if (signUpModal) {
      setSignUpModal(false)
      setSignInModal(true)
    }
  }

  const xpClass = (level) => {
    if (level <= 4) {
      return 'xp-user-badge badge-white';
    } else if (level > 4 && level < 10) {
      return 'xp-user-badge badge-yellow';
    } else if (level > 9 && level < 15) {
      return 'xp-user-badge badge-orange';
    } else if (level > 14 && level < 20) {
      return 'xp-user-badge badge-green';
    } else if (level > 19 && level < 24) {
      return 'xp-user-badge badge-blue';
    } else {
      return 'xp-user-badge badge-brown';
    }
  }

  return (
    <>
      {auth.currentUser ?
        <>
          <Dropdown isOpen={dropdown} toggle={toggleMenu} direction="down" size="md" className="dd-profile">
            <DropdownToggle color='transparent' className='dd-toggle' caret>
              {userData[0] ? <span className="d-inline-flex">
                <div className={xpClass(userData[0].level)}>
                  <span className="circle">
                    <span>{userData[0].level}</span>
                  </span>
                </div>
                {userData[0].name}
              </span>
                :
                <>
                  {user.displayName ?
                    user.displayName
                    :
                    <span className="d-inline-flex">
                      <div className={xpClass(1)}>
                        <span className="circle">
                          <span>1</span>
                        </span>
                      </div>
                      ClubUser
                    </span>
                  }
                </>
              }
            </DropdownToggle>
            <DropdownMenu >
              <DropdownItem onClick={() => navigate('/profile')}>Profile</DropdownItem>
              <DropdownItem onClick={() => auth.signOut()}>Sign Out</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </>
        :
        <>
          <div className="d-flex btn-auth-group">
            <button className="btn-auth btn-signin me-2" onClick={modalLogin}>Log In</button>
            <button className="btn-auth btn-signup" onClick={modalRegister}>Sign Up</button>
          </div>
          <Modal className='d-modal' isOpen={signInModal} size="md">
            <ModalBody>
              <div className='d-flex justify-content-end'>
                <button type="button" className="btn-close" aria-label="Close" onClick={modalLogin}></button>
              </div>
              <h4 className="text-center mb-3">Access to your account</h4>
              <FormGroup>
                <Input className="d-modal-input" name="email" placeholder="E-mail Address" onChange={handleInputChange} type="text" />
              </FormGroup>
              <FormGroup>
                <Input className="d-modal-input" name="password" placeholder="Password" onChange={handleInputChange} type="password" />
              </FormGroup>
              <FormGroup className='d-flex justify-content-between align-items-center'>
                <div>
                  <input id="persistence" type="checkbox"></input>&nbsp;
                  <label htmlFor="persistence">Keep Log in</label>
                </div>
                <button className='btn btn-transparent text-secondary' onClick={modalRecovery}>Forgot your password?</button>
              </FormGroup>
              <Button color="warning" type="button" className="w-100 mb-3" onClick={signInWithUserPass}>START PLAYING</Button>
              <h6 className="text-center">Or continue with</h6>
              <FormGroup className='d-flex justify-content-center'>
                <button className="btn btn-outline-primary" onClick={signInWithGoogle}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16">
                    <path
                      d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"
                    />
                  </svg>
                </button>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              {"You do not have an account?"}<button className='btn btn-transparent text-secondary' onClick={changeAccountModal}>Sign Up</button>
            </ModalFooter>
          </Modal>
          <Modal className='d-modal' isOpen={recoveryModal} size="md">
            <ModalBody>
              <FormGroup>
                <div className='d-flex justify-content-end'>
                  <button type="button" className="btn-close" aria-label="Close" onClick={modalRecovery}></button>
                </div>
                <h4 className="text-center">Send a password reset e-mail</h4>
              </FormGroup>
              <FormGroup>
                <small>Enter your email below and we will send you a link to reset your password</small>
              </FormGroup>
              <FormGroup>
                <Input className="d-modal-input" name="email" placeholder="E-mail Address" onChange={handleInputChange} type="text" />
              </FormGroup>
              <FormGroup>
                <Button color="warning" className="w-100" type="submit" onClick={recoveryPassword}>Reset Password</Button>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              {"You do not have an account?"}<button className="btn btn-transparent text-secondary" onClick={modalRegister}>Sign Up</button>
            </ModalFooter>
          </Modal>
          <Modal className='d-modal' isOpen={signUpModal} size="md">
            <ModalBody>
              <FormGroup>
                <div className='d-flex justify-content-end'>
                  <button type="button" className="btn-close" aria-label="Close" onClick={modalRegister}></button>
                </div>
                <h4 className="text-center">Create a new account</h4>
              </FormGroup>
              <FormGroup>
                <Input className="d-modal-input" name="email" placeholder="E-mail Address" onChange={handleInputChange} type="text" />
              </FormGroup>
              <FormGroup>
                <Input className="d-modal-input" name="password" placeholder="Password" onChange={handleInputChange} type="password" />
              </FormGroup>
              <Button color="warning" className="w-100 mb-3" type="submit" onClick={signUpWithUserPass}>SIGN UP</Button>
              <h6 className='text-center'>Or continue with</h6>
              <FormGroup className='d-flex justify-content-center'>
                <button className="btn btn-outline-primary" onClick={signInWithGoogle}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16">
                    <path
                      d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"
                    />
                  </svg>
                </button>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              {"Do you already have an account?"}<button className="btn btn-transparent text-secondary" onClick={changeAccountModal}>Log In</button>
            </ModalFooter>
          </Modal>
        </>
      }
    </>
  );
}
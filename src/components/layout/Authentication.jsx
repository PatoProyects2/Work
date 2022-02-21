import React, { useState } from 'react'
import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, setPersistence, browserSessionPersistence } from 'firebase/auth';
import { Button, Modal, ModalBody, ModalFooter, FormGroup, Input, Label } from 'reactstrap'
import { auth } from "../../firebase/firesbaseConfig"
function SignIn() {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: ''
  });
  const [log0, setLog0] = useState('')
  const [signUpModal, setSignUpModal] = useState(false)
  const [signInModal, setSignInModal] = useState(false)
  const [recoveryModal, setRecoveryModal] = useState(false)

  const handleInputChange = (event) => {
    setUserInfo({
      ...userInfo,
      [event.target.name]: event.target.value
    });
  }
  const modalRegister = () => {
    setLog0('')
    if (signUpModal) {
      setSignUpModal(false)
    } else {
      setSignUpModal(true)
    }
  }
  const modalLogin = () => {
    setLog0('')
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
    }
  }
  const signUpWithUserPass = () => {
    createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
      .then((userCredential) => {
        setLog0('')
        sendEmailVerification(auth.currentUser)
          .then(() => {

          });
      })
      .catch((error) => {
        setLog0('User already exist')
      });
  }
  const signInWithUserPass = () => {
    if (document.getElementById('persistence').checked === true) {
      setPersistence(auth, browserSessionPersistence)
        .then(() => {
          return signInWithEmailAndPassword(auth, userInfo.email, userInfo.password)
            .then((userCredential) => {
              setLog0('')
            }).catch((error) => {
              setLog0('Invalid email or password')
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    } else {
      signInWithEmailAndPassword(auth, userInfo.email, userInfo.password)
        .then((userCredential) => {
          setLog0('')
        }).catch((error) => {
          setLog0('Invalid email or password')
        });
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
        setLog0('Invalid email')
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
  return <>
    <button onClick={modalLogin}>Sign In</button>
    <button onClick={modalRegister}>Sign Up</button>

    <Modal isOpen={signInModal} size="md">
      {log0 && (<span className="alert alert-danger mx-5 row justify-content-center mt-2">{log0}</span>)}
      <ModalBody>
        <FormGroup>
          <h5 className="text-center">Access to your account</h5>
          <button type="button" className="btn-close" aria-label="Close" onClick={modalLogin}></button>
        </FormGroup>
        <FormGroup>
          {"You do not have an account?"}<button onClick={changeAccountModal}>Sign Up</button>
        </FormGroup>
        <FormGroup>
          <Input name="email" placeholder="E-mail Address" onChange={handleInputChange} type="text" />
        </FormGroup>
        <FormGroup>
          <Input name="password" placeholder="Password" onChange={handleInputChange} type="password" />
        </FormGroup>
        <p>
          <input id="persistence" type="checkbox"></input>&nbsp;
          <label htmlFor="persistence">Keep Log in</label>
        </p>
        <button onClick={modalRecovery}>Forgot your password?</button>
        <h6>Or continue with</h6>
        <FormGroup>
          <button onClick={signInWithGoogle}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16">
              <path
                d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"
              />
            </svg>
          </button>
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="warning" type="submit" onClick={signInWithUserPass}>Start Playing</Button>
      </ModalFooter>
    </Modal>

    <Modal isOpen={recoveryModal} size="md">
      {log0 && (<span className="alert alert-danger mx-5 row justify-content-center mt-2">{log0}</span>)}
      <ModalBody>
        <FormGroup>
          <h5 className="text-center">Send a password reset e-mail</h5>
          <button type="button" className="btn-close" aria-label="Close" onClick={modalRegister}></button>
        </FormGroup>
        <FormGroup>
          <small>Enter your email below and we will send you a link to reset your password</small>
        </FormGroup>
        <FormGroup>
          <Input name="email" placeholder="E-mail Address" onChange={handleInputChange} type="text" />
        </FormGroup>
        <FormGroup>
          <Button color="warning" type="submit" onClick={recoveryPassword}>Reset Password</Button>
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        {"You do not have an account?"}<button onClick={modalRegister}>Sign Up</button>
      </ModalFooter>
    </Modal>

    <Modal isOpen={signUpModal} size="md">
      {log0 && (<span className="alert alert-danger mx-5 row justify-content-center mt-2">{log0}</span>)}
      <ModalBody>
        <FormGroup>
          <h5 className="text-center">Create a new account</h5>
          <button type="button" className="btn-close" aria-label="Close" onClick={modalRegister}></button>
        </FormGroup>
        <FormGroup>
          {"Do you already have an account?"}<button onClick={changeAccountModal}>Sign In</button>
        </FormGroup>
        <FormGroup>
          <Input name="email" placeholder="E-mail Address" onChange={handleInputChange} type="text" />
        </FormGroup>
        <FormGroup>
          <Input name="password" placeholder="Password" onChange={handleInputChange} type="password" />
        </FormGroup>
        <h6>Or continue with</h6>
        <FormGroup>
          <button onClick={signInWithGoogle}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16">
              <path
                d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"
              />
            </svg>
          </button>
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="warning" type="submit" onClick={signUpWithUserPass}>SIGN UP</Button>
      </ModalFooter>
    </Modal>
  </>
}
export default SignIn;

export const SignOut = () => {

  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}
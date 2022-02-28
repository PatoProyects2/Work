import React, { useState } from 'react'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Button, Modal, ModalBody, ModalFooter, FormGroup, Input, Label } from 'reactstrap'
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../../../firebase/firesbaseConfig'

export default function ConnectWallet(props) {
  const [userInfo, setUserInfo] = useState({
    displayName: '',
    photoURL: 'https://ipfs.io/ipfs/QmP7jTCiimXHJixUNAVBkb7z7mCZQK3vwfFiULf5CgzUDh'
  });
  const [friend, setFriend] = useState({
    account1: '',
    amount1: 0,
  });
  const [log1, setLog1] = useState('');
  const [edit, setEdit] = useState(false);
  const [send, setSend] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleInputChange = (event) => {
    setUserInfo({
      ...userInfo,
      [event.target.name]: event.target.value
    });
    setFriend({
      ...friend,
      [event.target.name]: event.target.value
    });
  }

  const toggleMenu = () => {
    setDropdown(!dropdown);
  }

  const editProfile = () => {
    setLog1('')
    if (edit === false) {
      setEdit(true);
    } else {
      setEdit(false);
    }
  }

  const sendMatic = () => {
    if (send === false) {
      setSend(true);
    } else {
      setSend(false);
    }
  }

  const updateUserProfile = () => {
    if (userInfo.displayName.length >= 4 && userInfo.displayName.length <= 12) {
      updateDoc(doc(db, "clubUsers", props.account), {
        name: userInfo.displayName
      }).then(() => window.location.reload())
    } else {
      setLog1('Username 4-12 characters')
    }
  }

  const sendToFriend = () => {
    if (friend.account1.length === 42) {
      setLog1('');
    } else {
      setLog1('INVALID ADDRESS');
      return false
    }
    if (friend.amount1 > 0) {
      setLog1('');
    } else {
      setLog1('INVALID AMOUNT');
      return false
    }
    setFriend({
      ...friend,
      account1: '',
      amount: 0,
    })
    ethereum
      .request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: props.account,
            to: friend.account1,
            value: props.web3.utils.numberToHex((friend.amount1 * props.decimal).toString()),
          },
        ],
      })
      .then((txHash) => setSend(false))
      .catch((error) => console.error);
  }

  const manageWallets = async () => {
    ethereum.request({
      method: 'wallet_requestPermissions',
      params: [{
        eth_accounts: {},
      }]
    });
  }

  return (
    <>
      {props.account !== '0x000000000000000000000000000000000000dEaD' ?
        <>
          <Dropdown className="dd-profile" isOpen={dropdown} toggle={toggleMenu} direction="down" size="md">
            <DropdownToggle color='transparent' className='p-0'>
              {props.userData.photo && <img className="rounded-circle me-2" src={props.userData.photo} width="35" height="35" alt="" />}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>{props.userData.name}</DropdownItem>
              <DropdownItem header>{"LVL " + props.userData.level}</DropdownItem>
              <DropdownItem header>
                {props.account.substring(0, 5) + "..." + props.account.substring(38, 42)}
                <button className="btn-sm ms-2 btn-secondary"
                  onClick={() => navigator.clipboard.writeText(props.account)}>
                  <i className="fa-regular fa-clone white"></i>
                </button>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={editProfile}>Edit profile</DropdownItem>
              <DropdownItem onClick={sendMatic}>Send matic</DropdownItem>
              <DropdownItem onClick={manageWallets}>Accounts</DropdownItem>
              <DropdownItem onClick={props.disconnectWallet}>Disconnect</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Modal isOpen={edit} className="d-modal" size="sm">
            {log1 && (<span className="alert alert-danger mx-5 row justify-content-center mt-2">{log1}</span>)}
            <ModalBody>
              <h4 className="text-center">USER PROFILE</h4>
              <FormGroup className="pt-3 text-center">
                {props.userData.photo && <img className="rounded-circle me-2" src={props.userData.photo} width="105" height="105" alt="" />}
              </FormGroup>
              <FormGroup className="text-center">
                <Label>{"User since " + props.register}</Label>
              </FormGroup>
              <FormGroup>
                <Input
                  name="displayName"
                  placeholder="Username"
                  className="d-modal-input"
                  onChange={handleInputChange}
                  type="text"
                  defaultValue={props.userData.name} />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="warning" type="submit" onClick={updateUserProfile}>SAVE</Button>
              <Button color="secondary" onClick={editProfile}>CLOSE</Button>
            </ModalFooter>
          </Modal>
          <Modal isOpen={send} className="d-modal" size="sm">
            {log1 && (<span className="alert alert-danger mx-5 row justify-content-center mt-2">{log1}</span>)}
            <ModalBody>
              <h4 className="text-center">SEND MATIC</h4>
              <FormGroup>
                <Label>ADDRESS</Label>
                <Input name="account1" className="d-modal-input" placeholder="0x00..." onChange={handleInputChange} type="text" />
              </FormGroup>
              <FormGroup>
                <Label>AMOUNT</Label>
                <Input name="amount1" className="d-modal-input" placeholder="1" onChange={handleInputChange} type="number" />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="warning" type="submit" onClick={sendToFriend}>SEND</Button>
              <Button color="secondary" onClick={sendMatic}>CLOSE</Button>
            </ModalFooter>
          </Modal>
        </>
        :
        <Dropdown isOpen={dropdown} toggle={toggleMenu} direction="down" size="lg">
          <DropdownToggle color='danger' onClick={props.connectWeb3Modal}>
            {props.walletLog}
          </DropdownToggle>
        </Dropdown>
      }
    </>
  )
}

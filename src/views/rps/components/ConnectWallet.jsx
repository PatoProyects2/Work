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

  const sendMatic = () => {
    if (send === false) {
      setSend(true);
    } else {
      setSend(false);
    }
  }

  const updateUserProfile = () => {
    if (userInfo.displayName.length >= 4 && userInfo.displayName.length <= 12) {
      props.toast.promise(
        updateDoc(doc(db, "clubUsers", props.account), {
          name: userInfo.displayName
        }),
        {
          loading: 'Updating...',
          success: <b>Profile updated</b>,
          error: <b>Profile not updated</b>,
        }
      ).then(() => setEdit(false))
    } else {
      props.toast.error("The name must be between 4 and 12 characters")
    }
  }

  const sendToFriend = () => {
    if (friend.account1.length === 42) {

    } else {
      props.toast.error("Invalid address")
      return false
    }
    if (friend.amount1 > 0) {

    } else {
      props.toast.error("Invalid Amount")
      return false
    }

    setFriend({
      ...friend,
      account1: '',
      amount: 0,
    })

    props.toast.promise(
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
        }),
      {
        loading: 'Sending...',
        success: <b>Transaction confirmed</b>,
        error: <b>Transaction failed</b>,
      }
    ).then(() => setSend(false))
  }

  const manageWallets = () => {
    ethereum.request({
      method: 'wallet_requestPermissions',
      params: [{
        eth_accounts: {},
      }]
    });
  }


  const connectWallet = () => {
    if (document.getElementById('age').checked === false) {
      props.toast.error('Confirm that you are at least 18 years old')
      return false
    }
    props.connectWeb3Modal()
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
              <DropdownItem onClick={sendMatic}>Tip coins</DropdownItem>
              <DropdownItem onClick={manageWallets}>Accounts</DropdownItem>
              <DropdownItem onClick={props.disconnectWallet}>Disconnect</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Modal isOpen={send} className="d-modal" size="sm">
            <ModalBody>
              <div className='d-flex justify-content-end'>
                <button type="button" className="btn-close" aria-label="Close" onClick={sendMatic}></button>
              </div>
              <h4 className="text-center">Tip</h4>
              <FormGroup>
                <Label>Address</Label>
                <Input name="account1" className="d-modal-input" placeholder="0x00..." onChange={handleInputChange} type="text" />
              </FormGroup>
              <FormGroup>
                <Label>Amount</Label>
                <Input name="amount1" className="d-modal-input" placeholder="1" onChange={handleInputChange} type="number" />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="warning" type="submit" onClick={sendToFriend}>Send</Button>
            </ModalFooter>
          </Modal>
        </>
        :
        <Dropdown className='text-center' isOpen={dropdown} toggle={toggleMenu} direction="down" size="lg">
          <p className="text-center mt-3">
            <label className="switch">
              <input id="age" type="checkbox"></input>&nbsp;
              <span className="slider round"></span>
            </label>
            &nbsp;
            I confirm that I am at least 18 years old
          </p>
          <DropdownToggle color='danger' onClick={connectWallet}>
            CONNECT WALLET
          </DropdownToggle>
        </Dropdown>
      }
    </>
  )
}

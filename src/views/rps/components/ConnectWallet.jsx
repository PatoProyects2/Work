import React, { useState } from 'react'
import { doc, updateDoc } from "firebase/firestore";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Button, Modal, ModalBody, ModalFooter, FormGroup, Input, Label } from 'reactstrap'
import { db } from '../../../firebase/firesbaseConfig'
export default function ConnectWallet(props) {
  const [userinfo, setUserinfo] = useState({
    name0: '',
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
    setUserinfo({
      ...userinfo,
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

  const updateProfile = async () => {
    if (userinfo.name0.length >= 4 && userinfo.name0.length <= 12) {
      setLog1('');
    } else {
      setLog1('THE NAME MUST BE BETWEEN 4 AND 12 CHARACTERS');
      return false
    }
    updateDoc(doc(db, "clubUsers", props.login), {
      name: userinfo.name0,
      pic: 'https://ipfs.io/ipfs/QmP7jTCiimXHJixUNAVBkb7z7mCZQK3vwfFiULf5CgzUDh'
    }).then(r => {
      setEdit(false)
      window.location.reload()
    })
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
        <Dropdown isOpen={dropdown} toggle={toggleMenu} direction="down" size="md">
          <DropdownToggle color='transparent' className='p-0'>
            <img width="35" height="35" className="rounded-circle" alt="" src={`${props.userpic}`} />
          </DropdownToggle>
          <DropdownMenu className={props.theme === 'dark' ? 'bg-dark' : 'bg-light'}>
            <DropdownItem header>{props.username !== '' ? props.username : "Username"}</DropdownItem>
            <DropdownItem header>{"LVL " + props.userLevel}</DropdownItem>
            <DropdownItem header>
              {props.account.substring(0, 5) + "..." + props.account.substring(12, 16)}
              <button className={`btn-sm ms-2 ${props.theme === 'dark' ? 'btn-secondary' : 'btn-dark'}`}
                onClick={() => navigator.clipboard.writeText(props.account)}>
                <i className="fa-regular fa-clone white"></i>
              </button>
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem className={props.theme === 'dark' ? 'dropdown-item-dark' : ''} onClick={editProfile}>Edit profile</DropdownItem>
            <DropdownItem className={props.theme === 'dark' ? 'dropdown-item-dark' : ''} onClick={sendMatic}>Send matic</DropdownItem>
            <DropdownItem className={props.theme === 'dark' ? 'dropdown-item-dark' : ''} onClick={manageWallets}>Accounts</DropdownItem>
            <DropdownItem className={props.theme === 'dark' ? 'dropdown-item-dark' : ''} onClick={props.disconnectWallet}>Disconnect</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        :
        <Dropdown isOpen={dropdown} toggle={toggleMenu} direction="down" size="lg">
          <DropdownToggle color='danger' onClick={props.connectWeb3Modal}>
            {props.walletLog}
          </DropdownToggle>
        </Dropdown>
      }
      <Modal isOpen={edit} contentClassName={props.theme === 'dark' ? 'dark dark-border' : ''} size="sm">
        {log1 && (<span className="alert alert-danger mx-5 row justify-content-center mt-2">{log1}</span>)}
        <ModalBody>
          <h4 className="text-center">USER PROFILE</h4>
          <FormGroup className="pt-3 text-center">
            <img width="105" height="105" className="rounded-circle" alt="" src={`${props.userpic}`} />
          </FormGroup>
          <FormGroup className="text-center">
            <Label>{"User since " + props.register}</Label>
          </FormGroup>
          <FormGroup>
            <Input name="name0" placeholder="Username" className={props.theme === 'dark' ? 'dark-input' : ''} onChange={handleInputChange} type="text" defaultValue={props.username} />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="warning" type="submit" onClick={updateProfile}>SAVE</Button>
          <Button color="secondary" onClick={editProfile}>CLOSE</Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={send} contentClassName={props.theme === 'dark' ? 'dark dark-border' : ''} size="sm">
        {log1 && (<span className="alert alert-danger mx-5 row justify-content-center mt-2">{log1}</span>)}
        <ModalBody>
          <h4 className="text-center">SEND MATIC</h4>
          <FormGroup>
            <Label>ADDRESS</Label>
            <Input name="account1" className={props.theme === 'dark' ? 'dark-input' : ''} placeholder="0x00..." onChange={handleInputChange} type="text" />
          </FormGroup>
          <FormGroup>
            <Label>AMOUNT</Label>
            <Input name="amount1" className={props.theme === 'dark' ? 'dark-input' : ''} placeholder="1" onChange={handleInputChange} type="number" />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="warning" type="submit" onClick={sendToFriend}>SEND</Button>
          <Button color="secondary" onClick={sendMatic}>CLOSE</Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

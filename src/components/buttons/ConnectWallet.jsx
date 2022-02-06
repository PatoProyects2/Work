import React, { useState } from 'react'
import { doc, setDoc } from "firebase/firestore";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label } from 'reactstrap'
import db from '../../firebase/firesbaseConfig'

export default function ConnectWalletButton(props) {
  const [userinfo, setUserinfo] = useState({
    name1: '',
    pic1: ''
  });
  const [friend, setFriend] = useState({
    account1: '',
    amount1: 0,
  });
  const [decimal, setDecimal] = useState(1000000000000000000);
  const [log1, setLog1] = useState('Photo');
  const [log2, setLog2] = useState('Username');
  const [log3, setLog3] = useState('Wallet Address');
  const [log4, setLog4] = useState('Amount');
  const [edit, setEdit] = useState(false);
  const [send, setSend] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  function connect() {
    try {
      ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(handleAccountsChanged)
        .catch((err) => {
          if (err.code === 4001) {
            console.log('User denied login');
          } else {
            console.error(err);
          }
        });
    } catch (err) {
      window.open('https://metamask.app.link/dapp/patoproyects2.github.io/Work', '_blank')
      window.location.reload()
    }

  }

  function handleAccountsChanged() {
    console.log("Wallet connected!")
  }

  const handleInputChange = (event) => {
    setUserinfo({
      ...userinfo,
      [event.target.name]: event.target.value
    })
    setFriend({
      ...friend,
      [event.target.name]: event.target.value
    })
  }

  const toggleMenu = () => {
    setDropdown(!dropdown);
  }

  async function editProfile() {
    if (edit === false) {
      setEdit(true);
    } else {
      setEdit(false);
    }
  }

  async function sendMatic() {
    if (send === false) {
      setSend(true);
    } else {
      setSend(false);
    }
  }

  async function updateProfile() {
    if (document.getElementById('nft1').checked || document.getElementById('nft2').checked) {
      setLog1('Photo');
    } else {
      setLog1('Select a profile picture');
      return false
    }
    if (userinfo.name1.length >= 3 && userinfo.name1.length <= 12) {
      setLog2('Username');
    } else {
      setLog2('The name must be between 3 and 12 characters');
      return false
    }
    setUserinfo({
      ...userinfo,
      name1: '',
      pic1: ''
    })
    setDoc(doc(db, "users", props.account), userinfo).then(r => window.location.reload())
  }

  async function sendToFriend() {
    if (friend.account1.length === 42) {
      setLog3('Wallet Address');
    } else {
      setLog3('Invalid wallet address');
      return false
    }
    if (friend.amount1 > 0) {
      setLog4('Amount');
    } else {
      setLog4('Invalid amount');
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
            value: props.web3.utils.numberToHex((friend.amount1 * decimal).toString()),
          },
        ],
      })
      .then((txHash) => setSend(false))
      .catch((error) => console.error);
  }

  return (
    <>
      {props.account !== '' ?
        <Dropdown isOpen={dropdown} toggle={toggleMenu} direction="down" size="sm">
          <DropdownToggle caret color='warning'>
            <img width="100" height="100" src={`https://ipfs.io/ipfs/${props.data.pic1}`} alt="" />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>{props.data.name1}</DropdownItem>
            <DropdownItem header>{props.account.substring(0, 5) + "..." + props.account.substring(12, 16)}<button onClick={() => navigator.clipboard.writeText(props.account)}>[Copy]</button></DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={editProfile}>Edit Profile</DropdownItem>
            <DropdownItem onClick={sendMatic}>Send Matic</DropdownItem>
            <DropdownItem >Disconnect</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        :
        <button type="submit" onClick={connect} className='btn btn-warning'>CONNECT WALLET</button>
      }
      <Modal isOpen={edit}>
        <ModalHeader>
          Edit Profile
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label>{log1}</Label>
            <Label>
              <Input name="pic1" id="nft1" onChange={handleInputChange} type="radio" value="QmQ1cjPaQr8oCRvQk5KDDWfTRuoBgNnZVhQo1VzTF7S6c8?filename=nft%20bored%20ape.jpg" />
              <img width="50" height="50" src={`https://ipfs.io/ipfs/QmQ1cjPaQr8oCRvQk5KDDWfTRuoBgNnZVhQo1VzTF7S6c8?filename=nft%20bored%20ape.jpg`} alt="" />
            </Label>
            <Label>
              <Input name="pic1" id="nft2" onChange={handleInputChange} type="radio" value="QmQCXbQfDcJ5HRfKoRVaJ1L6mgh5dvaQkZw1bhKbrs8t7o?filename=nft2.jpg" />
              <img width="50" height="50" src={`https://ipfs.io/ipfs/QmQCXbQfDcJ5HRfKoRVaJ1L6mgh5dvaQkZw1bhKbrs8t7o?filename=nft2.jpg`} alt="" />
            </Label>
          </FormGroup>
          <FormGroup>
            <Label>{log2}</Label>
            <Input name="name1" onChange={handleInputChange} type="text" />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="submit" onClick={updateProfile}>Save</Button>
          <Button color="secondary" onClick={editProfile}>Close</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={send}>
        <ModalHeader>
          Send Matic
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label>{log3}</Label>
            <Input name="account1" placeholder="0x00..." onChange={handleInputChange} type="text" />
          </FormGroup>
          <FormGroup>
            <Label>{log4}</Label>
            <Input name="amount1" placeholder="1" onChange={handleInputChange} type="number" />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="submit" onClick={sendToFriend}>Send</Button>
          <Button color="secondary" onClick={sendMatic}>Close</Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

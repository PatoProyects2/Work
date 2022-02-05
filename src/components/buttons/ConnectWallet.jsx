import React, { useState } from 'react'
import { doc, setDoc } from "firebase/firestore";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label } from 'reactstrap'
import db from '../../firebase/firesbaseConfig'

export default function ConnectWalletButton(props) {
  const [userinfo, setUserinfo] = useState({
    name1: '',
    pic1: ''
  });
  const [log1, setLog1] = useState('Photo');
  const [log2, setLog2] = useState('Username');
  const [edit, setEdit] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  function connect() {
    ethereum
      .request({ method: 'eth_requestAccounts' })
      .then(handleAccountsChanged)
      .catch((err) => {
        if (err.code === 4001) {
          console.log('User denied connection');
        } else {
          console.error(err);
        }
      });
  }

  function handleAccountsChanged() {
    console.log("Wallet connected!")
  }

  const handleInputChange = (event) => {
    setUserinfo({
      ...userinfo,
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

  return (
    <>
      {props.account !== '' ?
        <Dropdown isOpen={dropdown} toggle={toggleMenu} direction="down" size="sm">
          <DropdownToggle caret color='warning'>
            WALLET
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header><img width="150" height="150" src={`https://ipfs.io/ipfs/${props.data.pic1}`} alt="" /></DropdownItem>
            <DropdownItem header>{props.data.name1}</DropdownItem>
            <DropdownItem header>{props.account.substring(0, 5) + "..." + props.account.substring(12, 16)}<button onClick={() => navigator.clipboard.writeText(props.account)}>[C]</button></DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={editProfile}>Edit Profile</DropdownItem>
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
    </>
  )
}

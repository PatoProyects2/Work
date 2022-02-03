import React, { useState, useEffect } from 'react'
import Web3 from 'web3'
import { useWeb3React } from "@web3-react/core"
import { doc, setDoc, getDoc } from "firebase/firestore";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label } from 'reactstrap'
import { injected } from "../blockchain/Connectors"
import db from '../../firebase/firesbaseConfig'

export default function ConnectWalletButton() {
  const [userdata, setUserdata] = useState({});
  const { active, activate, deactivate } = useWeb3React();
  const [dropdown, setDropdown] = useState(false);
  const [account, setAccount] = useState('0x0');
  const [edit, setEdit] = useState(false);
  const [userinfo, setUserinfo] = useState({
    name1: '',
    pic1: ''
  });
  const [log1, setLog1] = useState('Photo');
  const [log2, setLog2] = useState('Username');

  const toggleMenu = () => {
    setDropdown(!dropdown);
  }

  useEffect(() => {
    loadWeb3()
    loadBlockchainData()
  }, []);

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('ETHEREUM - BROWSER NOT DETECTED! PLEASE INSTALL METAMASK EXTENSION')
    }
  }

  async function loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    setAccount(accounts[0])

    const query = doc(db, "users", accounts[0]);
    const document = await getDoc(query)
    setUserdata(document.data())
  }

  async function connect() {
    try {
      await activate(injected)
    } catch (ex) {
      console.log(ex)
    }
  }

  async function disconnect() {
    try {
      deactivate()
    } catch (ex) {
      console.log(ex)
    }
  }

  async function editProfile() {
    if (edit === false) {
      setEdit(true);
    } else {
      setEdit(false);
    }
  }

  const handleInputChange = (event) => {
    setUserinfo({
      ...userinfo,
      [event.target.name]: event.target.value
    })
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
    await setDoc(doc(db, "users", account), userinfo)
    setLog1('Photo');
    setLog2('Username');
    setEdit(false);
    loadBlockchainData()
  }

  return (
    <>
      {active ?
        <Dropdown isOpen={dropdown} toggle={toggleMenu} direction="down" size="sm">
          <DropdownToggle caret color='warning'>
            WALLET
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header><img width="150" height="150" src={`https://ipfs.io/ipfs/${userdata.pic1}`} alt="" /></DropdownItem>
            <DropdownItem header>{userdata.name1}</DropdownItem>
            <DropdownItem header>{account.substring(0, 5) + "..." + account.substring(12, 16)}</DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={editProfile}>Edit Profile</DropdownItem>
            <DropdownItem onClick={disconnect}>Disconnect</DropdownItem>
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

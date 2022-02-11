import React, { useState, useEffect } from 'react'
import { doc, setDoc, getDoc } from "firebase/firestore";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label } from 'reactstrap'
import db from '../../../../firebase/firesbaseConfig'
import Nft1 from '../../../../assets/imgs/profile/nft1.png'
import Nft2 from '../../../../assets/imgs/profile/nft2.png'
import MetamaskLogo from '../../../../assets/imgs/MetaMask_Fox.png'

export default function ConnectWalletButton(props) {
  const [userinfo, setUserinfo] = useState({
    name1: '',
    pic1: '',
  });
  const [friend, setFriend] = useState({
    account1: '',
    amount1: 0,
  });
  const [register, setRegister] = useState('');
  const [userpic, setUserpic] = useState('');
  const [username, setUsername] = useState('');
  const [userphoto, setUserphoto] = useState('');
  const [log0, setLog0] = useState('Connect');
  const [log1, setLog1] = useState('');
  const [log2, setLog2] = useState('');
  const [balance, setBalance] = useState(0);
  const [edit, setEdit] = useState(false);
  const [send, setSend] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    loadProfile(props.account, props.web3)
  }, [props.account, props.web3]);

  function connect() {
    setLog0('Connecting...')
    try {
      ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(handleAccountsChanged)
        .catch((err) => {
          if (err.code === 4001) {
            setLog0('Connect')
          } else {
            setLog0('Connect')
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

  async function loadProfile(account, web3) {
    try {
      const query = doc(db, "users", account)
      const userDocument = await getDoc(query)
      const userData = userDocument.data()
      if (userData) {
        setUsername(userData.name1)
        setUserphoto(userData.pic1)
        setRegister(userData.register)
        const picPath = userData.pic1
        const profilePhoto = await import(`../../../../assets/imgs/profile/${picPath}`)
        setUserpic(profilePhoto.default)
      } else {
        const globalDate = new Date();
        const year = globalDate.getUTCFullYear()
        const month = globalDate.getUTCMonth() + 1
        const day = globalDate.getUTCDate()
        setDoc(doc(db, "users", account), {
          name1: 'Guest',
          pic1: 'avatar.png',
          register: day.toString() + "/" + month.toString() + "/" + year.toString(),
          winStreak: 0,
          winStreakBlock: 0
        })
      }
      let walletBalance = await web3.eth.getBalance(account)
      setBalance(walletBalance)
    } catch (e) {

    }
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
      setLog1('');
    } else {
      setLog1('Select a profile picture');
      return false
    }
    if (userinfo.name1.length >= 4 && userinfo.name1.length <= 12) {
      setLog1('');
    } else {
      setLog1('The name must be between 4 and 12 characters');
      return false
    }
    setUserinfo({
      ...userinfo,
      name1: '',
      pic1: ''
    })
    const query = doc(db, "users", props.account)
    const userDocument = await getDoc(query)
    const userData = userDocument.data()
    setDoc(doc(db, "users", props.account), { name1: userinfo.name1, pic1: userinfo.pic1, register: userData.register, winStreak: userData.winStreak, winStreakBlock: userData.winStreakBlock }).then(r => window.location.reload())
  }

  async function sendToFriend() {
    if (friend.account1.length === 42) {
      setLog2('');
    } else {
      setLog2('Invalid wallet address');
      return false
    }
    if (friend.amount1 > 0) {
      setLog2('');
    } else {
      setLog2('Invalid amount');
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

  async function manageWallets() {
    ethereum.request({
      method: 'wallet_requestPermissions',
      params: [{
        eth_accounts: {},
      }]
    });
  }

  return (
    <>
      {props.account !== '' ?
        <Dropdown isOpen={dropdown} toggle={toggleMenu} direction="down" size="md">
          <DropdownToggle caret color='danger'>
            {userpic && <img width="50" height="50" alt="" src={userpic} />}
          </DropdownToggle>
          <DropdownMenu className={props.theme === 'dark' ? 'bg-dark' : 'bg-light'}>
            <DropdownItem header>{username}</DropdownItem>
            <DropdownItem header>{props.account.substring(0, 5) + "..." + props.account.substring(12, 16)}
              <button className={`btn-sm ms-2 ${props.theme === 'dark' ? 'btn-secondary' : 'btn-dark'}`}
                onClick={() => navigator.clipboard.writeText(props.account)}>
                <i className="fa-regular fa-clone white"></i>
              </button>
            </DropdownItem>
            <DropdownItem header>{(balance / props.decimal).toFixed(4) + " MATIC"}</DropdownItem>
            <DropdownItem divider />
            <DropdownItem className={props.theme === 'dark' ? 'dropdown-item-dark' : ''} onClick={editProfile}>Edit profile</DropdownItem>
            <DropdownItem className={props.theme === 'dark' ? 'dropdown-item-dark' : ''} onClick={sendMatic}>Send matic</DropdownItem>
            <DropdownItem className={props.theme === 'dark' ? 'dropdown-item-dark' : ''} onClick={manageWallets}>Accounts</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        :
        <Dropdown isOpen={dropdown} toggle={toggleMenu} direction="down" size="md">
          <DropdownToggle color='danger' onClick={connect} disabled={log0 === 'Connecting...'}>
            {log0 === 'Connecting...' ? <img width="25" height="25" alt="" src={MetamaskLogo} /> : ""}
            {" " + log0}
          </DropdownToggle>
        </Dropdown>
      }
      <Modal isOpen={edit} contentClassName={props.theme === 'dark' ? 'dark dark-border' : ''}>
        <ModalHeader>
          USER PROFILE
        </ModalHeader>
        <ModalBody>
          {log1}
          <FormGroup>
            <Label>
              <Input name="pic1" id="nft1" onChange={handleInputChange} type="radio" value="nft1.png" />
              <img width="50" height="50" src={Nft1} alt="" />
            </Label>
            <Label>
              <Input name="pic1" id="nft2" onChange={handleInputChange} type="radio" value="nft2.png" />
              <img width="50" height="50" src={Nft2} alt="" />
            </Label>
          </FormGroup>
          <FormGroup>
            <Label>{"User since " + register}</Label>
          </FormGroup>
          <FormGroup>
            <Input name="name1" onChange={handleInputChange} type="text" defaultValue={username} />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="warning" type="submit" onClick={updateProfile}>SAVE</Button>
          <Button color="secondary" onClick={editProfile}>CLOSE</Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={send} contentClassName={props.theme === 'dark' ? 'dark dark-border' : ''}>
        <ModalHeader>
          SEND MATIC
        </ModalHeader>
        <ModalBody>
          {log2}
          <FormGroup>
            <Label>Address</Label>
            <Input name="account1" placeholder="0x00..." onChange={handleInputChange} type="text" />
          </FormGroup>
          <FormGroup>
            <Label>Amount</Label>
            <Input name="amount1" placeholder="1" onChange={handleInputChange} type="number" />
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

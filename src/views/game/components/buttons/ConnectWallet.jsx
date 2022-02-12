import React, { useState, useEffect } from 'react'
import { doc, setDoc, getDoc } from "firebase/firestore";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Button, Modal, ModalBody, ModalFooter, FormGroup, Input, Label } from 'reactstrap'
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
  const [log0, setLog0] = useState('Connect');
  const [log1, setLog1] = useState('');
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
    } catch (e) {

    }
  }

  async function editProfile() {
    setLog1('')
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
      setLog1('SELECT A NFT PICTURE');
      return false
    }
    if (userinfo.name1.length >= 4 && userinfo.name1.length <= 12) {
      setLog1('');
    } else {
      setLog1('THE NAME MUST BE BETWEEN 4 AND 12 CHARACTERS');
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
          <DropdownToggle color='transparent' className='p-0'>
            {userpic ? <img width="35" height="35" alt="" src={userpic} /> : <img width="35" height="35" className="rounded-circle" alt="" src="https://i.imgur.com/E3aJ7TP.jpg" />}
          </DropdownToggle>
          <DropdownMenu className={props.theme === 'dark' ? 'bg-dark' : 'bg-light'}>
            <DropdownItem header>{username}</DropdownItem>
            <DropdownItem header>{props.account.substring(0, 5) + "..." + props.account.substring(12, 16)}
              <button className={`btn-sm ms-2 ${props.theme === 'dark' ? 'btn-secondary' : 'btn-dark'}`}
                onClick={() => navigator.clipboard.writeText(props.account)}>
                <i className="fa-regular fa-clone white"></i>
              </button>
            </DropdownItem>
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
      <Modal isOpen={edit} contentClassName={props.theme === 'dark' ? 'dark dark-border' : ''} size="sm">
        {log1 && (<span className="alert alert-danger mx-5 row justify-content-center mt-2">{log1}</span>)}
        <ModalBody>
          <h4 className="text-center">USER PROFILE</h4>
          <FormGroup className="pt-3 text-center">
            <Label className="me-2">
              <Input name="pic1" id="nft1" className={props.theme === 'dark' ? 'dark-input' : ''} onChange={handleInputChange} type="radio" value="nft1.png" />
              <img width="65" height="65" src={Nft1} alt="" />
            </Label>
            <Label>
              <Input name="pic1" id="nft2" className={props.theme === 'dark' ? 'dark-input' : ''} onChange={handleInputChange} type="radio" value="nft2.png" />
              <img width="65" height="65" src={Nft2} alt="" />
            </Label>
          </FormGroup>
          <FormGroup className="text-center">
            <Label>{"User since " + register}</Label>
          </FormGroup>
          <FormGroup>
            <Input name="name1" placeholder="Nickname" className={props.theme === 'dark' ? 'dark-input' : ''} onChange={handleInputChange} type="text" defaultValue={username} />
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

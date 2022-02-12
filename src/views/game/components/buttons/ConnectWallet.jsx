import React, { useState, useEffect } from 'react'
import { doc, updateDoc } from "firebase/firestore";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Button, Modal, ModalBody, ModalFooter, FormGroup, Input, Label } from 'reactstrap'
import db from '../../../../firebase/firesbaseConfig'
import MetamaskLogo from '../../../../assets/imgs/MetaMask_Fox.png'
export default function ConnectWallet(props) {
  const [userinfo, setUserinfo] = useState({
    name1: '',
    pic1: '',
  });
  const [friend, setFriend] = useState({
    account1: '',
    amount1: 0,
  });
  const [log0, setLog0] = useState('Connect');
  const [log1, setLog1] = useState('');
  const [edit, setEdit] = useState(false);
  const [send, setSend] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const connect = () => {
    try {
      ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(setLog0('Connecting...'))
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
    // if (document.getElementById('nft1').checked || document.getElementById('nft2').checked) {
    //   setLog1('');
    // } else {
    //   setLog1('SELECT A NFT PICTURE');
    //   return false
    // }
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
    updateDoc(doc(db, "users", props.account), {
      name1: userinfo.name1
    })
    setEdit(false)
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
      {props.account !== '' ?
        <Dropdown isOpen={dropdown} toggle={toggleMenu} direction="down" size="md">
          <DropdownToggle color='transparent' className='p-0'>
            {props.userpic ? <img width="35" height="35" className="rounded-circle" alt="" src={props.userpic} /> : <img width="35" height="35" className="rounded-circle" alt="" src="https://i.imgur.com/E3aJ7TP.jpg" />}
          </DropdownToggle>
          <DropdownMenu className={props.theme === 'dark' ? 'bg-dark' : 'bg-light'}>
            <DropdownItem header>{props.username}</DropdownItem>
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
            {props.userpic && <img width="105" height="105" className="rounded-circle" alt="" src={props.userpic} />}
            {/* <Label className="me-2">
              <Input name="pic1" id="nft1" className={props.theme === 'dark' ? 'dark-input' : ''} onChange={handleInputChange} type="radio" value="nft1.png" />
              <img width="65" height="65" src={Nft1} alt="" />
            </Label>
            <Label>
              <Input name="pic1" id="nft2" className={props.theme === 'dark' ? 'dark-input' : ''} onChange={handleInputChange} type="radio" value="nft2.png" />
              <img width="65" height="65" src={Nft2} alt="" />
            </Label> */}
          </FormGroup>
          <FormGroup className="text-center">
            <Label>{"User since " + props.register}</Label>
          </FormGroup>
          <FormGroup>
            <Input name="name1" placeholder="Nickname" className={props.theme === 'dark' ? 'dark-input' : ''} onChange={handleInputChange} type="text" defaultValue={props.username} />
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

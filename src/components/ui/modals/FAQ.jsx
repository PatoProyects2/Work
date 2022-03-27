import React from 'react';
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap';

export const FAQ = ({ show, onHide }) => {

    return (
        <Modal
            isOpen={show}
            size="lg"
            toggle={onHide}
            centered>

            <ModalBody>
                <div className="px-5 pt-5">
                    <h4 className="text-sm text-left mb-1">Frequently Asked Questions</h4>
                    <br />
                    <h5 className="mb-0">What is a MetaMask Wallet?</h5>
                    <hr className='my-1' />
                    <p className="mb-4">
                        Available as a browser extension and as a mobile app, MetaMask equips you with a key vault,
                        secure login, token wallet, and token exchange—everything you need to manage your digital assets.
                        <a href="https://metamask.io/" className="text-warning" target="_blank" rel="noreferrer">&nbsp;https://metamask.io</a>

                    </p>
                    <h5 className="mb-0">How do I get funds (digital currency) in Metamask?</h5>
                    <hr className='my-1' />
                    <p className="mb-4">
                        You can easily buy Ethereum with a debit card or Apple Pay directly within MetaMask by clicking “Add funds”. You can request funds from a friend by sending them a payment request showing your QR code in person or by sharing your public address.
                    </p>
                    <h5 className="mb-0">What is Rock Paper Scissors (RPS)</h5>
                    <hr className='my-1' />
                    <p className="mb-4">
                        RPS stands for Rock, Paper, Scissors. Despite having 3 options, odds are 50/50% with a 3.5% Fee that goes for the project and RPS NFT owners.
                    </p>
                    <h5 className="mb-0">Transparency</h5>
                    <hr className='my-1' />
                    <p className="mb-4">
                        RPS Game has exactly a 50/50% odds established via a SmartContract . The project wallet will be public and everyone can check the transactions.
                    </p>
                    <h5 className="mb-0">Project Wallet</h5>
                    <hr className='my-1' />
                    <p className="mb-4">
                        ?????
                    </p>
                    <h5 className="mb-0">Additional Info</h5>
                    <hr className='my-1' />
                    <p className="mb-4">
                        Join our discord and Follow Us on twitter to access all the news and updates: <br />
                        <a href="https://twitter.com/RPSGamesClub" title="RPSGameClub Twitter" className="twitter-icon me-2" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-2x fa-twitter"></i>
                        </a>
                        <a href="https://discord.com/invite/AM65VtvP2Q" title="RPS Discord" className="discord-icon" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-2x fa-discord"></i>
                        </a>
                    </p>
                </div>

            </ModalBody>
            <ModalFooter>
                <Button color="warning" size="lg" className="w-100" onClick={onHide}>Got It</Button>
            </ModalFooter>
        </Modal>
    );
}
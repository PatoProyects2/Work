import React from 'react';
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap';

export const HowToPlay = ({ show, onHide }) => {

    return (
        <Modal
            isOpen={show}
            size="lg"
            toggle={onHide}
            centered>

            <ModalBody>
                <div className="px-5 pt-5">
                    <h2 className="text-sm text-left mb-1">How To Play</h2>
                    <br />
                    <p>
                        1. Connect your MetaMask Wallet.<br />
                        2. Choose your favorite option.<br />
                        3. Pick the amount you want to play with.<br />
                        4. Click “Double or Nothing”.<br />
                        5. Click approve and wait for the battle to end.<br />
                        6. Claim your prize!!.<br />
                    </p>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="warning" size="lg" className="w-100" onClick={onHide}>Got It</Button>
            </ModalFooter>
        </Modal>
    );
}
import React from 'react';
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap';

export const HowToPlay = ({ theme, show, onHide }) => {

    return (
        <Modal
            isOpen={show}
            size="lg"
            toggle={onHide}
            contentClassName={theme === "dark" ? "dark dark-border" : ""}
            centered>

            <ModalBody>
                <div className="px-5 pt-5">
                    <h2 className="text-sm text-left mb-1">How To Play</h2>
                    <br />
                    <p>
                        1. Connect your Wallet.<br />
                        2. Pick either rock, paper or scissors.<br />
                        3. Select your desired amount.<br />
                        4. Click “Double or Nothing”.<br />
                        5. Click approve and wait to see the the result.<br />
                        6. Congrats, you’re now a degenerate.<br />
                    </p>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="warning" size="lg" className="w-100" onClick={onHide}>Got It</Button>
            </ModalFooter>
        </Modal>
    );
}
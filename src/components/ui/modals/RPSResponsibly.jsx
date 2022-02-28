import React from 'react';
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap';

export const RPSResponsibly = ({ show, onHide }) => {

    return (
        <Modal
            isOpen={show}
            size="lg"
            toggle={onHide}
            centered>

            <ModalBody>
                <div className="px-5 pt-5">
                    <h4 className="text-sm text-left mb-1">Play Responsibly</h4>
                    <br />                    
                    <p className="mb-4">
                        We encourage all players to play responsibly and to have fun. Do not play with any income you can’t afford to lose.
                    </p>
                    <h5 className="mb-0">Ask For Help</h5>
                    <hr className='my-1' />
                    <p className="mb-4">
                        Chat <a href="https://ncpgambling.org/chat" className="text-warning" target="_blank" rel="noreferrer">ncpgambling.org/chat</a><br/>
                        Call or Text <a href="tel:1-800-522-4700" className="text-warning" target="_blank" rel="noreferrer">1-800-522-4700</a>
                    </p>                    
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="warning" size="lg" className="w-100" onClick={onHide}>Got It</Button>
            </ModalFooter>
        </Modal>
    );
}
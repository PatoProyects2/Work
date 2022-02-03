import React from 'react';
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap';

export const FAQ = ({ theme, show, onHide }) => {

    return (
        <Modal
            isOpen={show}
            size="lg"
            toggle={onHide}
            contentClassName={theme === "dark" ? "dark dark-border" : ""}
            centered>

            <ModalBody>
                <div className="px-5 pt-5">
                    <h4 className="text-sm text-left mb-1">Frequently Asked Questions</h4>
                    <br />
                    <h5 className="mb-0">What is Rock Paper Scissors (RPS)</h5>
                    <hr className='my-1' />
                    <p className="mb-4">
                        Lorem ipsum
                    </p>
                    <h5 className="mb-0">What is Rock Paper Scissors (RPS)</h5>
                    <hr className='my-1' />
                    <p className="mb-4">
                        Lorem ipsum
                    </p>
                    <h5 className="mb-0">What is Rock Paper Scissors (RPS)</h5>
                    <hr className='my-1' />
                    <p className="mb-4">
                        Lorem ipsum
                    </p>
                    <h5 className="mb-0">What is Rock Paper Scissors (RPS)</h5>
                    <hr className='my-1' />
                    <p className="mb-4">
                        Lorem ipsum
                    </p>
                </div>

            </ModalBody>
            <ModalFooter>
                <Button color="warning" size="lg" className="w-100" onClick={onHide}>Got It</Button>
            </ModalFooter>
        </Modal>
    );
}
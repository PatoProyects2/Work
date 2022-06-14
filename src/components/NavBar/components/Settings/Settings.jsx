import { useContext, useEffect, useState } from "react";
import { Button, ButtonGroup, FormGroup, Modal, ModalBody } from "reactstrap";
import { Context } from "../../../../context/Context";
import { useGas } from "../../../../hooks/useGas";

const Settings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    soundToggle,
    setSoundToggle,
    chatHistory,
    setChatHistory,
    gas,
    setGas,
  } = useContext(Context);
  const gasTrack = useGas();

  useEffect(() => {
    if (!gas && gasTrack) {
      setGas({ state: "instant", value: parseInt(gasTrack.fast.maxFee) });
    }
  }, [gas, gasTrack]);

  const toggleModal = () => {
    setIsOpen(isOpen ? false : true);
  };

  return (
    <div>
      <i
        role="button"
        onClick={toggleModal}
        className="fa fa-cog"
        style={{ color: "#ffdb5b" }}
        aria-hidden="true"
      ></i>
      <Modal isOpen={isOpen} className="d-modal" size="md">
        <ModalBody className="modal-body">
          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={toggleModal}
            ></button>
          </div>
          <h4 className="text-center">Settings</h4>
          <h6>Global</h6>
          <FormGroup className="pt-3 text-center">
            <span className="d-block mb-3">Sounds</span>
            <label className="switch">
              <input
                readOnly
                id="age"
                type="checkbox"
                checked={soundToggle}
                className="btn btn-info"
                onClick={() =>
                  soundToggle ? setSoundToggle(false) : setSoundToggle(true)
                }
              ></input>
              &nbsp;
              <span className="slider round"></span>
            </label>
          </FormGroup>
          <FormGroup className="pt-3 text-center">
            <span className="d-block mb-3">Transaction speed (GWEI)</span>
            {gasTrack && (
              <ButtonGroup>
                <Button
                  className={
                    gas.state === "standard"
                      ? "btn btn-info"
                      : "btn btn-secondary"
                  }
                  onClick={() =>
                    setGas({
                      state: "standard",
                      value: parseInt(gasTrack.safeLow.maxFee),
                    })
                  }
                >
                  Standard ({gasTrack.safeLow.maxFee.toFixed(2)})
                </Button>
                <Button
                  className={
                    gas.state === "fast" ? "btn btn-info" : "btn btn-secondary"
                  }
                  onClick={() =>
                    setGas({
                      state: "fast",
                      value: parseInt(gasTrack.standard.maxFee),
                    })
                  }
                >
                  Fast ({gasTrack.standard.maxFee.toFixed(2)})
                </Button>
                <Button
                  className={
                    gas.state === "instant"
                      ? "btn btn-info"
                      : "btn btn-secondary"
                  }
                  onClick={() =>
                    setGas({
                      state: "instant",
                      value: parseInt(gasTrack.fast.maxFee),
                    })
                  }
                >
                  Instant ({gasTrack.fast.maxFee.toFixed(2)})
                </Button>
              </ButtonGroup>
            )}
          </FormGroup>
          <h6>Chat</h6>
          <FormGroup className="pt-3 text-center">
            <span className="d-block mb-3">Chat Message History</span>
            <ButtonGroup>
              <Button
                type="button"
                className={
                  chatHistory === 50 ? "btn btn-info" : "btn btn-secondary"
                }
                onClick={() => setChatHistory(50)}
              >
                50
              </Button>
              <Button
                type="button"
                className={
                  chatHistory === 100 ? "btn btn-info" : "btn btn-secondary"
                }
                onClick={() => setChatHistory(100)}
              >
                100
              </Button>
              <Button
                type="button"
                className={
                  chatHistory === 300 ? "btn btn-info" : "btn btn-secondary"
                }
                onClick={() => setChatHistory(300)}
              >
                300
              </Button>
            </ButtonGroup>
          </FormGroup>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Settings;

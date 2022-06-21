import { useState } from "react";
import { Modal, ModalBody, Table } from "reactstrap";

const HistoryGames = ({ gamesData }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button className="btn-all-games" onClick={() => setIsOpen(true)}>
        All Games
      </button>

      <Modal isOpen={isOpen} className="d-modal" size="md">
        <ModalBody>
          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => setIsOpen(false)}
            ></button>
          </div>
          <h4 className="text-center effect-text">All Games</h4>
          <Table borderless responsive>
            <thead>
              <tr>
                <th>Id</th>
                <th>Result</th>
                <th>Amount</th>
                <th>Transaction</th>
              </tr>
            </thead>
            <tbody>
              {gamesData.map((games, index) => {
                return (
                  <tr key={index}>
                    <td>{games.id}</td>
                    <td>
                      <span
                        style={{
                          color: games.result ? "mediumseagreen" : "#ca5c7f",
                        }}
                      >
                        {games.result ? "doubled " : "went bankrupt "}
                      </span>
                    </td>
                    <td>{games.amount}</td>
                    <td>
                      <a
                        href={`https://polygonscan.com/tx/${games.txHash}`}
                        target="_blank"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </ModalBody>
      </Modal>
    </>
  );
};

export default HistoryGames;

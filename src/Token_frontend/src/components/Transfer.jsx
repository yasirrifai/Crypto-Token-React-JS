import React, { useState } from "react";
import { Principal } from "@dfinity/principal";
import { Token_backend } from "../../../declarations/Token_backend";

function Transfer() {
  const [recipeintID, setrecipeintID] = useState("");
  const [amount, setamount] = useState("");
  const [disable, setdisable] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [hiden, sethiden] = useState(true);

  async function handleClick() {
    setdisable(true);
    const ID = Principal.fromText(recipeintID);
    const Amount = Number(amount);
    const result = await Token_backend.transfer(ID, Amount);
    setFeedback(result);
    sethiden(false);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={recipeintID}
                onChange={(e) => setrecipeintID(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setamount(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick} disabled={disable}>
            Transfer
          </button>
        </p>
      </div>
      <p hidden={hiden}>{feedback}</p>
    </div>
  );
}

export default Transfer;

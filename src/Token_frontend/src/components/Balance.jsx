import React, { useState } from "react";
import { Principal } from "@dfinity/principal";
import { Token_backend } from "../../../declarations/Token_backend";

function Balance() {
  const [inputValue, setinputValue] = useState("");
  const [balance, setBalance] = useState("");
  const [currency, setCurrency] = useState("");

  async function handleClick() {
    const principal = Principal.fromText(inputValue);
    const balance = await Token_backend.balanceRemain(principal);
    setBalance(balance.toLocaleString());
    setCurrency(await Token_backend.getSymbol());
  }

  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={inputValue}
          onChange={(e) => setinputValue(e.target.value)}
        />
      </p>
      <p className="trade-buttons">
        <button id="btn-request-balance" onClick={handleClick}>
          Check Balance
        </button>
      </p>
      <p>
        This account has a balance of {balance} {currency}.
      </p>
    </div>
  );
}

export default Balance;

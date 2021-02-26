import React from "react";

export default ({
  name,
  price,
  description,
  add,
  reset,
  cancel,
  onPriceChange,
  onNameChange,
  OnDescChange,
}) => {
  return (
    <React.Fragment>
      <h3>Add New Drink</h3>
      <input
        type="text"
        placeholder="Name"
        className="input"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        maxLength="40"
      />
      <input
        type="number"
        placeholder="Price"
        className="input"
        value={price}
        onChange={(e) => onPriceChange(e.target.value)}
        maxLength="40"
      />
      <textarea
        type="text"
        placeholder="Notes"
        value={description}
        className="input"
        rows="5"
        onChange={(e) => OnDescChange(e.target.value)}
        maxLength="250"
      />
      <div className="modal-action-btn-container">
        <button
          className="modal-action-button"
          onClick={() => add()}
          disabled={!name}
        >
          Add
        </button>
        <button className="modal-action-button" onClick={() => reset()}>
          Reset
        </button>
        <button className="modal-action-button" onClick={() => cancel()}>
          Cancel
        </button>
      </div>
    </React.Fragment>
  );
};

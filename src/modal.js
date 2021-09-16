import Modal from "react-modal";
import React, { useEffect, useState } from "react";

Modal.setAppElement("#root");

const ModalComp = () => {
  const [open, setOpen] = React.useState(true);

  return (
    <div className="react-modal">
      <Modal isOpen={open}>
        <div>
          <h1>Lorem ipsum</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <div className="btn-group">
            <button className="btn" onClick={() => setOpen(false)}>
              I Agree
            </button>
            <button className="btn" onClick={() => setOpen(false)}>
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalComp;

import { useState, useEffect } from "react";

const Modal = ({ children }) => {
  return <>{children}</>;
  // <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
  //   <div className="modal" onClick={(e) => e.stopPropagation()}>
  //     <div className="modal-content"></div>
  //     <div className="modal-actions"></div>
  //   </div>
  // </div>
};

export default Modal;

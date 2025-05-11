const Modal = ({ children, setIsModalOpen, handleAddQuestion }) => {
  return (
    <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">{children}</div>
        <div className="modal-actions">
          <button onClick={handleAddQuestion}>추가</button>
          <button className="cancel" onClick={() => setIsModalOpen(false)}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

import React from 'react';

function ConfirmationModal({ show, onHide, onConfirm, title, message, confirmText = 'Hapus', cancelText = 'Batal', confirmVariant = 'danger' }) {
  const modalClass = show ? 'modal fade show d-block' : 'modal fade';
  const modalStyle = show ? { display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' } : { display: 'none' };


  return (
    <div className={modalClass} tabIndex="-1" role="dialog" style={modalStyle}>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onHide}></button>
          </div>
          <div className="modal-body">
            <p>{message}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onHide}>
              {cancelText}
            </button>
            <button type="button" className={`btn btn-${confirmVariant}`} onClick={onConfirm}>
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
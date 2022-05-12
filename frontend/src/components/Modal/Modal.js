import './Modal.css';

const Modal = ({ children, closeModal }) => {

    return (
        <div className="modal-background" onMouseDown={closeModal}>
            {children}
        </div>
    );
}

export default Modal;

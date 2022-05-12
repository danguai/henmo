import './Modal.css';

const Modal = ({ children, closeModalFunc }) => {

    return (
        <div className="modal-background" onMouseDown={closeModalFunc}>
            {children}
        </div>
    );
}

export default Modal;

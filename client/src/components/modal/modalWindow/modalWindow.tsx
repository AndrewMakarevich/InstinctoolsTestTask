import './modalWindow.css';

const ModalWindow = ({ children, modalState, setModalState }: { children: JSX.Element, modalState: boolean, setModalState: Function }) => {
  if (!modalState) {
    return (
      null
    )
  }
  return (
    <div className="modal-window__wrapper" onClick={() => setModalState(false)}>
      <div className="modal-window__content-block" onClick={(e) => e.stopPropagation()}>
        <button className="modal-window__close-btn" onClick={() => setModalState(false)}>✖</button>
        <section className='modal-window__content'>
          {children}
        </section>
      </div>
    </div>
  )
};
export default ModalWindow;
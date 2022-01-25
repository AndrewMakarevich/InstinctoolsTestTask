
import { useEffect, useState } from "react";
import { IEmployeeObj, IManagerObj } from "../../../interfaces/userResponseInterfaces";
import ModalWindow from "../modalWindow/modalWindow";
import './editUserModal.css';

const EditUserModal = ({ modalState, setModalState, userData }: { modalState: boolean, setModalState: Function, userData: IEmployeeObj | IManagerObj }) => {
  const [currentUser, setCurrentUser] = useState(userData);
  useEffect(() => {
    setCurrentUser(userData);
  }, [userData]);
  function isUserEmployee(user: IEmployeeObj | IManagerObj): user is IEmployeeObj {
    if ((user as IEmployeeObj).startTimeReception && (user as IEmployeeObj).endTimeReception) {
      return false
    } else {
      return true;
    }
  }
  function setPhoto(photoFile: File) {
    if (photoFile) {
      const fr = new FileReader();
      fr.readAsDataURL(photoFile);
      fr.addEventListener('load', () => {
        const label: HTMLLabelElement = document.querySelector('.edit-user__file-input__label')!;
        label.style.backgroundImage = `url(${fr.result})`;
      });
    }
  }
  const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  return (
    <ModalWindow modalState={modalState} setModalState={setModalState}>
      <div className="edit-user__wrapper">
        <form className="edit-user__avatar">
          <label className="edit-user__file-input__label" style={{ backgroundImage: `url(${process.env.REACT_APP_SERVER_URL}/avatar/${userData.photo})` }}>
            <input disabled className="edit-user__file-input" type="file" accept="image/png, image/jpeg" onChange={(e) => setPhoto(e.target.files![0])}></input>
            <span></span>
          </label>
        </form>
        <form className="edit-user__common-params edit-user__form">
          <label>
            Name:
            <input value={currentUser.fullName.name}></input>
          </label>
          <label>
            Surname:
            <input value={currentUser.fullName.surname}></input>
          </label>
          <label>
            Patronymic:
            <input value={currentUser.fullName.patronymic}></input>
          </label>
          <label>
            Salary:
            <input value={currentUser.salary}></input>
          </label>
        </form>
        {
          isUserEmployee(currentUser) ?
            <form className="edit-user__employee-params edit-user__form">
              <label>
                Lunch started at:
                <input value={currentUser.startTimeLunch}></input>
              </label>
              <label>
                Lunch ended at:
                <input value={currentUser.endTimeLunch}></input>
              </label>
              <label>
                Workplace number:
                <input value={currentUser.workPlaceNumber}></input>
              </label>
            </form>
            :
            <form className="edit-user__manager-params edit-user__form">
              <label>
                Reception started at:
                <input value={currentUser.startTimeReception}></input>
              </label>
              <label>
                Reception ended at:
                <input value={currentUser.endTimeReception}></input>
              </label>
            </form>
        }
        <div className="edit-user__data-info">
          <p>Created at: {new Date(userData.createdAt).toLocaleString('en-EN', dateOptions)}</p>
          <p>Updated at: {userData.createdAt === userData.updatedAt ? 'No updates' : new Date(userData.updatedAt).toLocaleString('en-EN', dateOptions)}</p>
        </div>

      </div>
    </ModalWindow>
  )
};
export default EditUserModal;
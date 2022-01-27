
import { useEffect, useState } from "react";
import { IEmployeeObj, IManagerObj, IUsersFullName } from "../../../interfaces/userResponseInterfaces";
import { validateRangeTimes, validateUserInput } from "../../../validator/validateUserInput";
import DeleteUserBtn from "../../buttons/deleteUserBtn";
import EditUserBtn from "../../buttons/editUserBtn";
import ModalWindow from "../modalWindow/modalWindow";
import './editUserModal.css';

const EditUserModal = ({ modalState, setModalState, userData }: { modalState: boolean, setModalState: Function, userData: IEmployeeObj | IManagerObj }) => {
  const [currentUser, setCurrentUser] = useState(userData);
  const [paramsToEdit, setParamsToEdit] = useState<{ [key: string]: any }>({});
  const [editMode, setEditMode] = useState<boolean>(true);

  function isUserEmployee(user: IEmployeeObj | IManagerObj): user is IEmployeeObj {
    if ((user as IEmployeeObj).startTimeReception && (user as IEmployeeObj).endTimeReception) {
      return false
    } else {
      return true;
    }
  }
  function setPhoto(photoFile?: File) {
    const label: HTMLLabelElement = document.querySelector('.edit-user__file-input__label')!;
    if (photoFile) {
      const fr = new FileReader();
      fr.readAsDataURL(photoFile);
      fr.addEventListener('load', () => {
        label.style.backgroundImage = `url(${fr.result})`;
      });
      setEditParam('photo', photoFile);
    } else {
      label.style.backgroundImage = `${label.dataset.defBg}`;
      deleteParamToEdit('photo');
    }

  }
  function setFullNameParam(param: string, value: string) {
    let fullNameObj: { [key: string]: any };
    if (!paramsToEdit['fullName']) {
      fullNameObj = {};
    } else {
      fullNameObj = paramsToEdit['fullName'];
    }
    if (!value.split(' ').join('')) {
      delete fullNameObj[param];
      if (!Object.keys(fullNameObj).length) {
        deleteParamToEdit('fullName');
      }
    }
    else {
      fullNameObj[param] = value;
      setParamsToEdit({ ...paramsToEdit, fullName: fullNameObj });
    }
  }
  function setEditParam(param: string, value: string | File) {
    if ((typeof value === 'string' && !value.split(' ').join('')) || !value) {
      if (paramsToEdit[param]) {
        return deleteParamToEdit(param);
      } else return;
    }
    setParamsToEdit({ ...paramsToEdit, [param]: value });
  }
  function deleteParamToEdit(param: string) {
    delete paramsToEdit[param];
    setParamsToEdit({ ...paramsToEdit });
  }
  function toggleEditMode(editMode: boolean) {
    const editUserBlock = document.querySelector('.edit-user__wrapper');
    const editUserInputs: NodeListOf<HTMLInputElement> | undefined = editUserBlock?.querySelectorAll('form label input');
    console.log(editUserInputs);
    editUserInputs?.forEach(input => {
      input.disabled = editMode;
    });

  }
  useEffect(() => {
    setCurrentUser(userData);
    setParamsToEdit({});
  }, [userData]);
  useEffect(() => {
    console.log(paramsToEdit);

  }, [paramsToEdit]);
  // useEffect(() => {
  //   toggleEditMode(editMode);
  // }, [editMode]);
  const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  return (
    <ModalWindow modalState={modalState} setModalState={setModalState}>
      <div className="edit-user__wrapper">
        <form className="edit-user__avatar">
          <label data-def-bg={`url(${process.env.REACT_APP_SERVER_URL}/avatar/${currentUser.photo})`} className="edit-user__file-input__label" style={{ backgroundImage: `url(${process.env.REACT_APP_SERVER_URL}/avatar/${currentUser.photo})` }}>
            <input className="edit-user__file-input" type="file" accept="image/png, image/jpeg" onChange={(e) => setPhoto(e.target.files![0])}></input>
            <span></span>
          </label>
          <button onClick={(e) => {
            e.preventDefault();
            setPhoto();
          }}>Remove photo</button>
        </form>
        <form className="edit-user__common-params edit-user__form">
          <label>
            Name:
            <input
              key={currentUser._id}
              defaultValue={currentUser.fullName.name}
              onBlur={(e) => {
                try {
                  console.log(e.target.defaultValue);
                  validateUserInput('fullName', e.target.value);
                } catch (err) {
                  alert(err);
                  setFullNameParam('name', '');
                  e.target.value = e.target.defaultValue;
                }
              }}
              onChange={(e) => {
                setFullNameParam('name', e.target.value);
              }}></input>
          </label>
          <label>
            Surname:
            <input
              key={currentUser._id}
              defaultValue={currentUser.fullName.surname}
              onBlur={(e) => {
                try {
                  validateUserInput('fullName', e.target.value);
                } catch (err) {
                  alert(err);
                  setFullNameParam('surname', '');
                  e.target.value = e.target.defaultValue;
                }
              }}
              onChange={(e) => setFullNameParam('surname', e.target.value)}></input>
          </label>
          <label>
            Patronymic:
            <input
              key={currentUser._id}
              defaultValue={currentUser.fullName.patronymic}
              onBlur={(e) => {
                try {
                  validateUserInput('fullName', e.target.value);
                } catch (err) {
                  alert(err);
                  setFullNameParam('patronymic', '');
                  e.target.value = e.target.defaultValue;
                }
              }}
              onChange={(e) => setFullNameParam('patronymic', e.target.value)}></input>
          </label>
          <label>
            Salary:
            <input
              key={currentUser._id}
              defaultValue={currentUser.salary}
              onBlur={(e) => {
                try {
                  validateUserInput('salary', e.target.value);
                } catch (err) {
                  alert(err);
                  setEditParam('salary', '');
                  e.target.value = e.target.defaultValue;
                }
              }}
              onChange={(e) => setEditParam('salary', e.target.value)}></input>
          </label>
        </form>
        {
          isUserEmployee(currentUser) ?
            <form className="edit-user__employee-params edit-user__form">
              <label>
                Lunch started at:
                <input
                  key={currentUser._id}
                  type="time"
                  defaultValue={currentUser.startTimeLunch}
                  onBlur={(e) => {
                    try {
                      const endTimeValue = paramsToEdit.endTimeLunch ? paramsToEdit.endTimeLunch : currentUser.endTimeLunch;
                      validateRangeTimes(e.target.value, endTimeValue);
                    } catch (err) {
                      alert(err);
                      setEditParam('startTimeLunch', '');
                      e.target.value = e.target.defaultValue;
                    }
                  }}
                  onChange={(e) => setEditParam('startTimeLunch', e.target.value)}></input>
              </label>
              <label>
                Lunch ended at:
                <input
                  key={currentUser._id}
                  type="time"
                  defaultValue={currentUser.endTimeLunch}
                  onBlur={(e) => {
                    try {
                      const startTimeValue = paramsToEdit.startTimeLunch ? paramsToEdit.startTimeLunch : currentUser.startTimeLunch;
                      validateRangeTimes(startTimeValue, e.target.value);
                    } catch (err) {
                      alert(err);
                      setEditParam('endTimeLunch', '');
                      e.target.value = e.target.defaultValue;
                    }
                  }}
                  onChange={(e) => setEditParam('endTimeLunch', e.target.value)}></input>
              </label>
              <label>
                Workplace number:
                <input
                  key={currentUser._id}
                  defaultValue={currentUser.workPlaceNumber}
                  onBlur={(e) => {
                    try {
                      validateUserInput('workplace', e.target.value);
                    } catch (err) {
                      alert(err);
                      setEditParam('workPlaceNumber', '');
                      e.target.value = e.target.defaultValue;
                    }
                  }}
                  onChange={(e) => setEditParam('workPlaceNumber', e.target.value)}></input>
              </label>
            </form>
            :
            <form className="edit-user__manager-params edit-user__form">
              <label>
                Reception started at:
                <input
                  key={currentUser._id}
                  type="time"
                  defaultValue={currentUser.startTimeReception}
                  onBlur={(e) => {
                    try {
                      const endTimeValue = paramsToEdit.endTimeReception ? paramsToEdit.endTimeReception : currentUser.endTimeReception;
                      validateRangeTimes(e.target.value, endTimeValue)
                    } catch (err) {
                      alert(err);
                      setEditParam('startTimeReception', '');
                      e.target.value = e.target.defaultValue;
                    }
                  }}
                  onChange={(e) => setEditParam('startTimeReception', e.target.value)}></input>
              </label>
              <label>
                Reception ended at:
                <input
                  key={currentUser._id}
                  type="time"
                  defaultValue={currentUser.endTimeReception}
                  onBlur={(e) => {
                    try {
                      const startTimeValue = paramsToEdit.startTimeReception ? paramsToEdit.startTimeReception : currentUser.startTimeReception;
                      validateRangeTimes(startTimeValue, e.target.value);
                    } catch (err) {
                      alert(err);
                      setEditParam('endTimeReception', '');
                      e.target.value = e.target.defaultValue;
                    }
                  }}
                  onChange={(e) => setEditParam('endTimeReception', e.target.value)}></input>
              </label>
            </form>
        }
        <div className="edit-user__data-info">
          <p>Created at: {new Date(currentUser.createdAt).toLocaleString('en-EN', dateOptions)}</p>
          <p>Updated at: {currentUser.createdAt === currentUser.updatedAt ? 'No updates' : new Date(currentUser.updatedAt).toLocaleString('en-EN', dateOptions)}</p>
        </div>
        <EditUserBtn userType={isUserEmployee(currentUser) ? 'employee' : 'manager'} userId={currentUser._id} paramsToEdit={paramsToEdit} />
        <DeleteUserBtn userType={isUserEmployee(currentUser) ? 'employee' : 'manager'} userId={currentUser._id} />
      </div>

    </ModalWindow>
  )
};
export default EditUserModal;
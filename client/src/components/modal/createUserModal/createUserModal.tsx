
import { useEffect, useState } from "react";
import { createUser } from "../../../https/userApi";
import { AxiosError } from "axios";
import { IUsersFullName } from "../../../interfaces/userResponseInterfaces";
import ModalWindow from "../modalWindow/modalWindow";
import './createUserModal.css';
import { validateUserInput, validateRangeTimes } from "../../../validator/validateUserInput";
import { useDispatch } from "react-redux";
import { UserStoreActions } from "../../../redux/reducers/userReducer";

const CreateUserModal = ({ updateUserListFunc }: { updateUserListFunc: Function }) => {
  const dispatch = useDispatch();
  const [modalState, setModalState] = useState(false);
  const [currentUserType, setCurrentUserType] = useState<'employee' | 'manager'>('employee');
  const [userPhoto, setUserPhoto] = useState<File>();
  const [commonParams, setCommonParams] = useState({
    fullName: {
      name: '',
      surname: '',
      patronymic: ''
    },
    salary: 0
  });
  const [employeeParams, setEmployeeParams] = useState({
    startTimeLunch: "",
    endTimeLunch: "",
    workPlaceNumber: ""
  });
  const [managerParams, setManagerParams] = useState({
    startTimeReception: "",
    endTimeReception: ""
  });

  function setPhoto(photoFile: File) {
    if (photoFile) {
      const fr = new FileReader();
      fr.readAsDataURL(photoFile);
      fr.addEventListener('load', () => {
        const avatar: HTMLLabelElement = document.querySelector('.create-user__file-input__label')!;
        avatar.style.backgroundImage = `url(${fr.result})`;
      });
      setUserPhoto(photoFile);
    }
  }
  function setFullNameParam(param: string, value: string) {
    const fullNameObj: IUsersFullName = commonParams.fullName;
    fullNameObj[param] = value;
    setCommonParams({ ...commonParams, fullName: { ...fullNameObj } })
  }
  async function sendUserData(type: 'employee' | 'manager') {
    try {
      const formData = new FormData();
      formData.append('fullName', JSON.stringify(commonParams.fullName));
      formData.append('salary', String(commonParams.salary));
      formData.append('photo', userPhoto || '')
      if (type === 'employee') {
        formData.append('startTimeLunch', employeeParams.startTimeLunch);
        formData.append('endTimeLunch', employeeParams.endTimeLunch);
        formData.append('workPlaceNumber', employeeParams.workPlaceNumber);
      } else if (type === 'manager') {
        formData.append('startTimeReception', managerParams.startTimeReception);
        formData.append('endTimeReception', managerParams.endTimeReception);
      }
      const response = await createUser(type, formData);
      alert(response.message);
      dispatch({ type: UserStoreActions.FETCH_USERS });
    } catch (e) {
      alert((e as AxiosError).response?.data.message);
    }

  }

  return (
    <>
      <button className='open-create-user-modal__btn' onClick={() => setModalState(true)}>Add +</button>
      <ModalWindow modalState={modalState} setModalState={setModalState}>
        <div className="create-user-forms__wrapper">
          <form className="create-user__form choose-avatar__form">
            <label className="create-user__file-input__label">
              <input className="create-user__file-input" type="file" accept="image/png, image/jpeg" onChange={(e) => setPhoto(e.target.files![0])}></input>
              <span></span>
            </label>
          </form>
          <form className="create-user__form common-params__form">
            <h3>Common parameters</h3>
            <label>
              Name:
              <input
                className="create-user__input"
                value={commonParams.fullName.name}
                onBlur={(e) => {
                  try {
                    validateUserInput('fullName', e.target.value)
                  } catch (e) {
                    alert(e);
                    setFullNameParam('name', '')
                  }
                }}
                onChange={(e) => setFullNameParam('name', e.target.value)}></input>
            </label>
            <label>
              Surname:
              <input
                className="create-user__input"
                value={commonParams.fullName.surname}
                onBlur={(e) => {
                  try {
                    validateUserInput('fullName', e.target.value)
                  } catch (e) {
                    alert(e);
                    setFullNameParam('surname', '')
                  }
                }}
                onChange={(e) => setFullNameParam('surname', e.target.value)}></input>
            </label>
            <label>
              Patronymic:
              <input
                className="create-user__input"
                value={commonParams.fullName.patronymic}
                onBlur={(e) => {
                  try {
                    validateUserInput('fullName', e.target.value)
                  } catch (e) {
                    alert(e);
                    setFullNameParam('patronymic', '')
                  }
                }}
                onChange={(e) => setFullNameParam('patronymic', e.target.value)}></input>
            </label>
            <label>
              Salary:
              <input
                className="create-user__input"
                type="number"
                value={commonParams.salary}
                onBlur={(e) => {
                  try {
                    validateUserInput('salary', e.target.value)
                  } catch (e) {
                    alert(e);
                    setCommonParams({ ...commonParams, salary: 0 })
                  }
                }}
                onChange={(e) => setCommonParams({ ...commonParams, salary: +e.target.value })}></input>
            </label>
          </form>
          <form className="create-user__form user-type__form">
            <label className="create-user__radio-label">
              Employee
              <input className="create-user__radio" name="user-type" type="radio" onChange={(e) => setCurrentUserType('employee')} />
              <span></span>
            </label>
            <label className="create-user__radio-label">
              Manager
              <input className="create-user__radio" name="user-type" type="radio" onChange={(e) => setCurrentUserType('manager')} />
              <span></span>
            </label>
          </form>
          {
            currentUserType === 'employee' ?
              <form className="create-user__form employee-params__form">
                <h3>Employee parameters</h3>
                <label>
                  Lunch started at:
                  <input
                    className="create-user__data-input"
                    type="time"
                    value={employeeParams.startTimeLunch}
                    onBlur={(e) => {
                      try {
                        validateRangeTimes(e.target.value, employeeParams.endTimeLunch);
                      } catch (e) {
                        alert(e);
                        setEmployeeParams({ ...employeeParams, startTimeLunch: '' })
                      }
                    }}
                    onChange={(e) => setEmployeeParams({ ...employeeParams, startTimeLunch: e.target.value })}></input>
                </label>
                <label>
                  Lunch ended at:
                  <input
                    className="create-user__data-input"
                    type="time"
                    value={employeeParams.endTimeLunch}
                    onBlur={(e) => {
                      try {
                        validateRangeTimes(employeeParams.startTimeLunch, e.target.value);
                      } catch (e) {
                        alert(e);
                        setEmployeeParams({ ...employeeParams, endTimeLunch: '' })
                      }
                    }}
                    onChange={(e) => setEmployeeParams({ ...employeeParams, endTimeLunch: e.target.value })}></input>
                </label>
                <label>
                  Workplace number:
                  <input
                    className="create-user__input"
                    type="number"
                    value={employeeParams.workPlaceNumber}
                    onBlur={(e) => {
                      try {
                        validateUserInput('workplace', e.target.value)
                      } catch (e) {
                        alert(e);
                        setEmployeeParams({ ...employeeParams, workPlaceNumber: '' });
                      }
                    }}
                    onChange={(e) => setEmployeeParams({ ...employeeParams, workPlaceNumber: e.target.value })}></input>
                </label>
              </form>
              :
              <form className="create-user__form manager-params__form">
                <h3>Manager parameters</h3>
                <label>
                  Reception started at:
                  <input
                    className="create-user__data-input"
                    type="time"
                    value={managerParams.startTimeReception}
                    onBlur={(e) => {
                      try {
                        validateRangeTimes(e.target.value, managerParams.endTimeReception);
                      } catch (e) {
                        alert(e);
                        setManagerParams({ ...managerParams, startTimeReception: '' });
                      }
                    }}
                    onChange={(e) => setManagerParams({ ...managerParams, startTimeReception: e.target.value })}></input>
                </label>
                <label>
                  Reception ended at:
                  <input
                    className="create-user__data-input"
                    type="time"
                    value={managerParams.endTimeReception}
                    onBlur={(e) => {
                      try {
                        validateRangeTimes(managerParams.startTimeReception, e.target.value);
                      } catch (e) {
                        alert(e);
                        setManagerParams({ ...managerParams, endTimeReception: '' });
                      }
                    }}
                    onChange={(e) => setManagerParams({ ...managerParams, endTimeReception: e.target.value })}></input>
                </label>
              </form>
          }
          <button className="create-user__btn" onClick={() => sendUserData(currentUserType)}>Create user</button>
        </div>
      </ModalWindow>
    </>
  )
};
export default CreateUserModal;
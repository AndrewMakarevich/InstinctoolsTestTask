
import { useEffect, useState } from "react";
import { createUser } from "../../../https/userApi";
import { AxiosError } from "axios";
import { IUsersFullName } from "../../../interfaces/userResponseInterfaces";
import ModalWindow from "../modalWindow/modalWindow";
import './createUserModal.css';
import { validateUserInput, validateRangeTimes } from "../../../validator/validateUserInput";
import { useDispatch } from "react-redux";
import { UserStoreActions } from "../../../redux/reducers/userReducer";
import { ControlledUserInput, ControlledUserTimeInput } from "../../userInput/userInput";

const CreateUserModal = ({ updateUserListFunc }: { updateUserListFunc: Function }) => {
  const dispatch = useDispatch();
  const commonParamsObj = {
    fullName: {
      name: '',
      surname: '',
      patronymic: ''
    },
    salary: 0
  };
  const employeeParamsObj = {
    startTimeLunch: "",
    endTimeLunch: "",
    workPlaceNumber: ""
  };
  const managerParamsObj = {
    startTimeReception: "",
    endTimeReception: ""
  }
  const [modalState, setModalState] = useState(false);
  const [currentUserType, setCurrentUserType] = useState<'employee' | 'manager'>('employee');
  const [userPhoto, setUserPhoto] = useState<File>();
  const [commonParams, setCommonParams] = useState(commonParamsObj);
  const [employeeParams, setEmployeeParams] = useState(employeeParamsObj);
  const [managerParams, setManagerParams] = useState(managerParamsObj);

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
  function setPrimitiveParam(paramState: any, setParamFunc: React.Dispatch<React.SetStateAction<any>>) {
    return (param: string, value: string) => {
      setParamFunc({ ...paramState, [param]: value });
    };
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
      clearParamsStates();
    } catch (e) {
      alert((e as AxiosError).response?.data.message);
    }

  }
  function clearParamsStates() {
    setCommonParams(commonParamsObj);
    setEmployeeParams(employeeParamsObj);
    setManagerParams(managerParamsObj);
  }

  useEffect(() => {
    console.log({ ...commonParams, ...employeeParams, ...managerParams });
  }, [commonParams, employeeParams, managerParams])

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
            <ControlledUserInput
              value={commonParams.fullName.name}
              disabledValue={false}
              inputType='text'
              header='Name'
              userParam='name'
              validator={validateUserInput}
              setParamFunc={setFullNameParam}
            />
            <ControlledUserInput
              value={commonParams.fullName.surname}
              disabledValue={false}
              inputType='text'
              header='Surname'
              userParam='surname'
              validator={validateUserInput}
              setParamFunc={setFullNameParam}
            />
            <ControlledUserInput
              value={commonParams.fullName.patronymic}
              disabledValue={false}
              inputType='text'
              header='Patronymic'
              userParam='patronymic'
              validator={validateUserInput}
              setParamFunc={setFullNameParam}
            />
            <ControlledUserInput
              value={commonParams.salary}
              disabledValue={false}
              inputType='number'
              header='Salary'
              userParam='salary'
              validator={validateUserInput}
              setParamFunc={setPrimitiveParam(commonParams, setCommonParams)}
            />
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
                < ControlledUserTimeInput
                  disabledValue={false}
                  header="Lunch started at"
                  userParam="startTimeLunch"
                  value={employeeParams.startTimeLunch}
                  timePos="startTime"
                  valueToCompare={employeeParams.endTimeLunch}
                  validator={validateRangeTimes}
                  setParamFunc={setPrimitiveParam(employeeParams, setEmployeeParams)} />
                < ControlledUserTimeInput
                  disabledValue={false}
                  header="Lunch ended at"
                  userParam="endTimeLunch"
                  value={employeeParams.endTimeLunch}
                  timePos="endTime"
                  valueToCompare={employeeParams.startTimeLunch}
                  validator={validateRangeTimes}
                  setParamFunc={setPrimitiveParam(employeeParams, setEmployeeParams)} />
                <ControlledUserInput
                  value={employeeParams.workPlaceNumber}
                  disabledValue={false}
                  inputType='number'
                  header='Workplace number'
                  userParam='workPlaceNumber'
                  validator={validateUserInput}
                  setParamFunc={setPrimitiveParam(employeeParams, setEmployeeParams)}
                />
              </form>
              :
              <form className="create-user__form manager-params__form">
                <h3>Manager parameters</h3>
                <ControlledUserTimeInput
                  disabledValue={false}
                  header="Reception started at"
                  userParam="startTimeReception"
                  value={managerParams.startTimeReception}
                  timePos="startTime"
                  valueToCompare={managerParams.endTimeReception || "00:00"}
                  validator={validateRangeTimes}
                  setParamFunc={setPrimitiveParam(managerParams, setManagerParams)} />
                <ControlledUserTimeInput
                  disabledValue={false}
                  header="Reception ended at"
                  userParam="endTimeReception"
                  value={managerParams.endTimeReception}
                  timePos="endTime"
                  valueToCompare={managerParams.startTimeReception || "00:00"}
                  validator={validateRangeTimes}
                  setParamFunc={setPrimitiveParam(managerParams, setManagerParams)} />
              </form>
          }
          <button className="create-user__btn" onClick={() => sendUserData(currentUserType)}>Create user</button>
        </div>
      </ModalWindow>
    </>
  )
};
export default CreateUserModal;
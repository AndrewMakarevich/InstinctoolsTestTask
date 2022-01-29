
import { useEffect, useState } from "react";
import { IEmployeeObj, IManagerObj, IUsersFullName } from "../../../interfaces/userResponseInterfaces";
import { validateRangeTimes, validateUserInput } from "../../../validator/validateUserInput";
import DeleteUserBtn from "../../buttons/deleteUserBtn";
import EditUserBtn from "../../buttons/editUserBtn";
import BooleanUserCheckBox from "../../userCheckbox/userCheckBox";
import { UserInput, UserTimeInput } from "../../userInput/userInput";
import ModalWindow from "../modalWindow/modalWindow";
import './editUserModal.css';

const EditUserModal = ({ modalState, setModalState, userData }: { modalState: boolean, setModalState: Function, userData: IEmployeeObj | IManagerObj }) => {
  const [currentUser, setCurrentUser] = useState(userData);
  const [paramsToEdit, setParamsToEdit] = useState<{ [key: string]: any }>({});
  const [disableMode, setDisableMode] = useState<boolean>(true);

  function isUserEmployee(user: IEmployeeObj | IManagerObj): user is IEmployeeObj {
    if ((user as IEmployeeObj).startTimeReception && (user as IEmployeeObj).endTimeReception) {
      return false
    } else {
      return true;
    }
  }
  function setPhoto(labelClassName: string, fileInpuClassName: string, photoFile?: File) {
    const label: HTMLLabelElement = document.querySelector(`.${labelClassName}`)!;
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
      const fileInput: HTMLInputElement = document.querySelector(`.${fileInpuClassName}`)!;
      fileInput.value = '';
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
  useEffect(() => {
    setCurrentUser(userData);
    setParamsToEdit({});
    setDisableMode(true);
  }, [userData]);
  useEffect(() => {
    console.log(paramsToEdit);

  }, [paramsToEdit]);
  const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  return (
    <ModalWindow modalState={modalState} setModalState={setModalState}>
      <div className="edit-user__wrapper">
        <form className="edit-user__avatar">
          <label data-def-bg={`url(${process.env.REACT_APP_SERVER_URL}/avatar/${currentUser.photo})`} className="edit-user__file-input__label" style={{ backgroundImage: `url(${process.env.REACT_APP_SERVER_URL}/avatar/${currentUser.photo})` }}>
            <input
              disabled={disableMode}
              className="edit-user__file-input"
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) => setPhoto('edit-user__file-input__label', e.target.className, e.target.files![0])}
            ></input>
            <span></span>
          </label>
          {
            paramsToEdit.photo ?
              <button
                className="clear-file-input__btn delete__btn"
                onClick={(e) => {
                  e.preventDefault();
                  setPhoto('edit-user__file-input__label', 'edit-user__file-input');
                }}>Remove photo</button>
              :
              null
          }

        </form>
        <form className="edit-user__common-params edit-user__form">
          <UserInput
            disabledValue={disableMode}
            inputType='text'
            header="Name"
            userParam="name"
            defValue={currentUser.fullName.name}
            validator={validateUserInput}
            setParamFunc={setFullNameParam} />
          <UserInput
            disabledValue={disableMode}
            inputType='text'
            header="Surname"
            userParam="surname"
            defValue={currentUser.fullName.surname}
            validator={validateUserInput}
            setParamFunc={setFullNameParam} />
          <UserInput
            disabledValue={disableMode}
            inputType='text'
            header="Patronymic"
            userParam="patronymic"
            defValue={currentUser.fullName.patronymic}
            validator={validateUserInput}
            setParamFunc={setFullNameParam} />
          <UserInput
            disabledValue={disableMode}
            inputType='number'
            header="Salary"
            userParam="salary"
            defValue={currentUser.salary}
            validator={validateUserInput}
            setParamFunc={setEditParam} />
        </form>
        {
          isUserEmployee(currentUser) ?
            <form className="edit-user__employee-params edit-user__form">
              <UserTimeInput
                disabledValue={disableMode}
                header="Lunch started at"
                userParam="startTimeLunch"
                defValue={currentUser.startTimeLunch}
                timePos="startTime"
                valueToCompare={paramsToEdit.endTimeLunch ? paramsToEdit.endTimeLunch : currentUser.endTimeLunch}
                validator={validateRangeTimes}
                setParamFunc={setEditParam} />
              <UserTimeInput
                disabledValue={disableMode}
                header="Lunch ended at"
                userParam="endTimeLunch"
                defValue={currentUser.endTimeLunch}
                timePos="endTime"
                valueToCompare={paramsToEdit.startTimeLunch ? paramsToEdit.startTimeLunch : currentUser.startTimeLunch}
                validator={validateRangeTimes}
                setParamFunc={setEditParam} />
              <UserInput
                disabledValue={disableMode}
                inputType="number"
                header="Workplace number"
                userParam="workPlaceNumber"
                defValue={currentUser.workPlaceNumber}
                validator={validateUserInput}
                setParamFunc={setEditParam}
              />
            </form>
            :
            <form className="edit-user__manager-params edit-user__form">
              <UserTimeInput
                disabledValue={disableMode}
                header="Reception started at"
                userParam="startTimeReception"
                defValue={currentUser.startTimeReception}
                timePos="startTime"
                valueToCompare={paramsToEdit.endTimeReception ? paramsToEdit.endTimeReception : currentUser.endTimeReception}
                validator={validateRangeTimes}
                setParamFunc={setEditParam} />
              <UserTimeInput
                disabledValue={disableMode}
                header="Reception ended at"
                userParam="endTimeReception"
                defValue={currentUser.endTimeReception}
                timePos="endTime"
                valueToCompare={paramsToEdit.startTimeReception ? paramsToEdit.startTimeReception : currentUser.startTimeReception}
                validator={validateRangeTimes}
                setParamFunc={setEditParam} />
            </form>
        }
        <div className="edit-user__data-info">
          <p>Created at: {new Date(currentUser.createdAt).toLocaleString('en-EN', dateOptions)}</p>
          <p>Updated at: {currentUser.createdAt === currentUser.updatedAt ? 'No updates' : new Date(currentUser.updatedAt).toLocaleString('en-EN', dateOptions)}</p>
        </div>
        <BooleanUserCheckBox
          labelText="Edit"
          currentState={disableMode}
          changeStateFunc={setDisableMode}
        />
        {
          disableMode ?
            null
            :
            <>
              <EditUserBtn userType={isUserEmployee(currentUser) ? 'employee' : 'manager'} userId={currentUser._id} paramsToEdit={paramsToEdit} />
              <DeleteUserBtn userType={isUserEmployee(currentUser) ? 'employee' : 'manager'} userId={currentUser._id} />
            </>
        }

      </div>

    </ModalWindow >
  )
};
export default EditUserModal;
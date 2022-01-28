import { editUser } from "../../https/userApi";
import { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { UserStoreActions } from "../../redux/reducers/userReducer";

import './userBtns.css'

const EditUserBtn = ({ userType, userId, paramsToEdit }: { userType: 'employee' | 'manager', userId: string, paramsToEdit: { [key: string]: any } }) => {
  const dispatch = useDispatch();
  async function sendUserChanges() {
    try {
      console.log(paramsToEdit);
      const formData = new FormData();
      for (let key in paramsToEdit) {
        if (paramsToEdit[key] instanceof File || (typeof paramsToEdit[key] === 'string' || typeof paramsToEdit[key] === 'number')) {
          console.log(paramsToEdit);
          formData.append(key, paramsToEdit[key]);
        } else {
          formData.append(key, JSON.stringify(paramsToEdit[key]));
        }
      }
      const response = await editUser(userType, userId, formData);
      alert(response.message);
      dispatch({ type: UserStoreActions.FETCH_USERS });
    } catch (e) {
      alert((e as AxiosError).response?.data.message);
    }

  }
  return (
    <button
      className="edit-user__btn"
      disabled={Object.keys(paramsToEdit).length ? false : true}
      onClick={() => {
        if (!Object.keys(paramsToEdit).length) {
          return alert('Nothing to change');
        }
        return sendUserChanges()
      }}>
      Submit changes
    </button>
  )
}
export default EditUserBtn;
import { useDispatch } from "react-redux";
import { deleteUser } from "../../https/userApi";
import { UserStoreActions } from "../../redux/reducers/userReducer";

import './userBtns.css'

const DeleteUserBtn = ({ userId, userType }: { userId: string, userType: 'employee' | 'manager' }) => {
    const dispatch = useDispatch();
    async function deleteUserData() {
        const response = await deleteUser(userType, userId);
        alert(response.message);
        dispatch({ type: UserStoreActions.FETCH_USERS });
    }
    return (
        <button
            className="delete-user__btn delete__btn"
            onClick={() => {
                const confirmDelete = window.confirm('Are you sure you want to delete user?');
                if (confirmDelete) {
                    deleteUserData();
                }
            }}>Delete user</button>
    )
};
export default DeleteUserBtn;
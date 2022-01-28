import { useState } from "react";
import { IEmployeeObj, IManagerObj } from "../../interfaces/userResponseInterfaces";
import './usersList.css';
import UserItem from "./userItem/userItem";
import EditUserModal from "../modal/editUserModal/editUserModal";

const UsersList = ({ users }: { users: (IEmployeeObj | IManagerObj)[] | undefined }) => {
  const [modalState, setModalState] = useState(false);
  const [currentUser, setCurrentUser] = useState<IEmployeeObj | IManagerObj | null>(null);
  return (
    <div className="user-card__list">
      {
        users ?
          users.map(user =>
            <div className="user-card" key={user._id}>
              <button
                className="open-user-card-modal__btn"
                onClick={() => {
                  setModalState(true);
                  setCurrentUser(user);
                }}></button>
              <UserItem user={user} />
            </div>
          ) :
          <h3>data is loading</h3>
      }
      {
        currentUser ?
          <EditUserModal modalState={modalState} setModalState={setModalState} userData={currentUser} />
          :
          null
      }

    </div>
  )
}
export default UsersList;
import { IEmployeeObj, IManagerObj } from "../../interfaces/userResponseInterfaces";
import './usersList.css';
import UserItem from "./userItem/userItem";

const UsersList = ({ users }: { users: (IEmployeeObj | IManagerObj)[] | undefined }) => {
  return (
    <div className="user-card__list">
      {
        users ?
          users.map(user =>
            <UserItem key={user._id} user={user} />
          ) :
          <h3>data is loading</h3>
      }
    </div>
  )
}
export default UsersList;
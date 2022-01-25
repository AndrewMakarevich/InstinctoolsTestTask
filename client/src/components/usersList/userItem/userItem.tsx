
import { IEmployeeObj, IManagerObj } from "../../../interfaces/userResponseInterfaces";
import './userItem.css';
const UserItem = ({ user }: { user: IEmployeeObj | IManagerObj }) => {
  function isUserEmployee(user: IEmployeeObj | IManagerObj): user is IEmployeeObj {
    if ((user as IEmployeeObj).startTimeReception && (user as IEmployeeObj).endTimeReception) {
      return false
    } else {
      return true;
    }
  }
  return (

    <section className="user-card">
      <img className="user-card__img" alt={`${user.fullName.name}'s avatar`} src={`${process.env.REACT_APP_SERVER_URL}/avatar/${user.photo}`} />
      <h3 className="user-card__info-header">Info</h3>
      <ul className="user-card__info-list">
        <li><b>Full name:</b> {user.fullName.name} {user.fullName.surname} {user.fullName.patronymic}</li>
        <li><b>Salary:</b> {user.salary}</li>
        {
          isUserEmployee(user) ?
            <>
              <li><b>Workplace №:</b> {user.workPlaceNumber}</li>
              <li><b>Lunch time:</b> {user.startTimeLunch}-{user.endTimeLunch}</li>
            </>
            :
            <li><b>Reception time:</b> {user.startTimeReception}-{user.endTimeReception}</li>
        }


      </ul>
    </section>
  )
}
export default UserItem;
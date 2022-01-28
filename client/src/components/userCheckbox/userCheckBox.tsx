import './userCheckbox.css'
interface IUserCheckBoxProps {
    labelText: string,
    currentState: boolean;
    changeStateFunc: React.Dispatch<React.SetStateAction<boolean>>
}

const BooleanUserCheckBox = ({ labelText, currentState, changeStateFunc }: IUserCheckBoxProps) => {
    return (
        <label className="edit-user__checkbox-label">
            {labelText}
            <input className='edit-user__checkbox' type="checkbox" onChange={(e) => changeStateFunc(!currentState)}></input>
            <span></span>
        </label>
    )
}
export default BooleanUserCheckBox;
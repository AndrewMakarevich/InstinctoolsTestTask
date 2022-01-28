import './userInput.css'

interface IUserInputProps {
  disabledValue: boolean
  header: string,
  userId: string,
  userParam: string,
  defValue: string | number,
  setParamFunc(userParam: string, value: string): void
}
interface IdefaultUserInput extends IUserInputProps {
  inputType: 'text' | 'number' | 'email'
  validator(inputType: string, inputValue: string | number): void,
}
interface ItimeUserInput extends IUserInputProps {
  timePos: "startTime" | 'endTime';
  valueToCompare: string;
  validator(startTime: string, endTime: string | number): void,
}

export function UserInput({ disabledValue, inputType, header, userId, userParam, defValue, validator, setParamFunc }: IdefaultUserInput) {
  return (
    <label>
      {header}:
      <input
        className="user-param__input"
        disabled={disabledValue}
        type={inputType}
        key={defValue}
        defaultValue={defValue}
        onBlur={(e) => {
          try {
            validator(userParam, e.target.value);
          } catch (err) {
            alert(err);
            setParamFunc(userParam, '');
            e.target.value = e.target.defaultValue;
          }
        }}
        onChange={(e) => {
          setParamFunc(userParam, e.target.value);
        }}></input>
    </label>
  )
};
export function UserTimeInput({ disabledValue, header, userId, userParam, defValue, timePos, valueToCompare, validator, setParamFunc }: ItimeUserInput) {
  return (
    <label>
      {header}:
      <input
        disabled={disabledValue}
        type="time"
        key={userId}
        defaultValue={defValue}
        onBlur={(e) => {
          try {
            if (timePos === 'startTime') validator(e.target.value, valueToCompare);
            else if (timePos === 'endTime') validator(valueToCompare, e.target.value);
          } catch (err) {
            alert(err);
            setParamFunc(userParam, '');
            e.target.value = e.target.defaultValue;
          }
        }}
        onChange={(e) => {
          setParamFunc(userParam, e.target.value);
        }}></input>
    </label>
  )
}

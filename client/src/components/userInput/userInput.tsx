import './userInput.css'

interface IUserInputProps {
  disabledValue: boolean
  header: string,
  userParam: string,
  setParamFunc(userParam: string, value: string): void
}
interface IdefaultUserInput extends IUserInputProps {
  defValue: string | number,
  inputType: 'text' | 'number' | 'email'
  validator(inputType: string, inputValue: string | number): void,
}
interface ItimeUserInput extends IUserInputProps {
  defValue: string | number,
  timePos: "startTime" | 'endTime';
  valueToCompare: string;
  validator(startTime: string, endTime: string | number): void,
}
interface IControlledUserInput extends IUserInputProps {
  value: string | number
  inputType: 'text' | 'number' | 'email'
  validator(inputType: string, inputValue: string | number): void
}
interface IControlledTimeUserInput extends IUserInputProps {
  value: string | number
  timePos: "startTime" | 'endTime';
  valueToCompare: string;
  validator(startTime: string, endTime: string | number): void,
}

export function UserInput({ disabledValue, inputType, header, userParam, defValue, validator, setParamFunc }: IdefaultUserInput) {
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
export function UserTimeInput({ disabledValue, header, userParam, defValue, timePos, valueToCompare, validator, setParamFunc }: ItimeUserInput) {
  return (
    <label>
      {header}:
      <input
        disabled={disabledValue}
        type="time"
        key={defValue}
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
export function ControlledUserInput({ disabledValue, inputType, header, userParam, validator, setParamFunc, value }: IControlledUserInput) {
  return (
    <label>
      {header}:
      <input
        className="user-param__input"
        disabled={disabledValue}
        value={value}
        type={inputType}
        onBlur={(e) => {
          try {
            validator(userParam, e.target.value);
          } catch (err) {
            alert(err);
            setParamFunc(userParam, '');
          }
        }}
        onChange={(e) => {
          setParamFunc(userParam, e.target.value);
        }}></input>
    </label>
  )
};
export function ControlledUserTimeInput({ disabledValue, header, userParam, timePos, valueToCompare, validator, setParamFunc, value }: IControlledTimeUserInput) {
  return (
    <label>
      {header}:
      <input
        disabled={disabledValue}
        type="time"
        value={value}
        onBlur={(e) => {
          try {
            if (timePos === 'startTime') validator(e.target.value, valueToCompare);
            else if (timePos === 'endTime') validator(valueToCompare, e.target.value);
          } catch (err) {
            alert(err);
            setParamFunc(userParam, "");
          }
        }}
        onChange={(e) => {
          setParamFunc(userParam, e.target.value);
        }}></input>
    </label>
  )
}

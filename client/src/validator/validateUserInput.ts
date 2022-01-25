export function validateUserInput(inputType: string, inputValue: string) {
    if (!inputValue) return;
    if (inputType === 'fullName') {
        const regEx = /^[a-zA-Zа-яА-ЯёЁ]{2,22}$/g
        if (!regEx.test(inputValue)) {
            throw Error('Incorrect full name param.')
        }
        return;
    }
    if (inputType === 'salary') {
        // const regEx = /^[0-9]{1,4}$/g
        if (Number(inputValue) < 0) {
            throw Error('Incorrect salary param, salary must be positive value')
        }
        return;
    }
    if (inputType === 'workplace') {
        if (Number(inputValue) < 0 || Number(inputValue) > 999) {
            throw Error('Incorrect workplace number param, workplace cant be negative and higher than 999');
        }
        return;
    }
}
export function validateRangeTimes(startTime: string, endTime: string) {
    const startTimeDate = new Date().setHours(+startTime.split(':')[0], +startTime.split(':')[1], 0);
    const endTimeDate = new Date().setHours(+endTime.split(':')[0], +endTime.split(':')[1], 0);
    console.log(startTimeDate);
    console.log(endTimeDate);
    if (startTimeDate > endTimeDate) {
        throw Error('Incorrect time param');
    }
}
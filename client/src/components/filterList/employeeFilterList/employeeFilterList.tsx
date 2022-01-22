const EmployeeFilterList = ({ setTimeRange, clearTimeRange, setPrimitiveFilterParam }: { setTimeRange: Function, clearTimeRange: Function, setPrimitiveFilterParam: Function }) => {
    return (
        <form className="filter-list__form">
            <h3>Employee params:</h3>
            <label className='filter-list__label'>
                Lunch started at:
                <input
                    type="time"
                    onChange={(e) => setTimeRange(e.target.value, 'startTimeLunch', 'start')}
                    className="filter-list__time-input input__startTimeLunch"></input>
                -
                <input
                    type="time"
                    onChange={(e) => setTimeRange(e.target.value, 'startTimeLunch', 'end')}
                    className="filter-list__time-input input__startTimeLunch"></input>
                <button className="clear-time-input__btn"
                    onClick={(e) => {
                        e.preventDefault();
                        clearTimeRange('input__startTimeLunch', 'startTimeLunch');
                    }}>clear</button>
            </label>
            <label className='filter-list__label'>
                Lunch ended at:
                <input
                    type="time"
                    onChange={(e) => setTimeRange(e.target.value, 'endTimeLunch', 'start')}
                    className="filter-list__time-input input__endTimeLunch"></input>
                -
                <input
                    type="time"
                    onChange={(e) => setTimeRange(e.target.value, 'endTimeLunch', 'end')}
                    className="filter-list__time-input input__endTimeLunch"></input>
                <button className="clear-time-input__btn"
                    onClick={(e) => {
                        e.preventDefault();
                        clearTimeRange('input__endTimeLunch', 'endTimeLunch');
                    }}>clear</button>
            </label>
            <label className='filter-list__label'>
                Workplace number:
                <input
                    onChange={(e) => { setPrimitiveFilterParam('workPlaceNumber', e.target.value) }}
                    className='filter-list__input'></input>
                <span className="filter-list__input-styled-line"></span>
            </label>

        </form>
    )
};
export default EmployeeFilterList;
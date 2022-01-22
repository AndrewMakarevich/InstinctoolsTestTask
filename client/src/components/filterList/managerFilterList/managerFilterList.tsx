const ManagerFilterList = ({ setTimeRange, clearTimeRange }: { setTimeRange: Function, clearTimeRange: Function }) => {
    return (
        <form className="filter-list__form">
            <h3>Manager params:</h3>
            <label className='filter-list__label'>
                Start of reception:
                <input className="filter-list__time-input input__startTimeReception" type="time" onChange={(e) => setTimeRange(e.target.value, 'startTimeReception', 'start')}></input>
                -
                <input className="filter-list__time-input input__startTimeReception" type="time" onChange={(e) => setTimeRange(e.target.value, 'startTimeReception', 'end')}></input>
                <button className="clear-time-input__btn"
                    onClick={(e) => {
                        e.preventDefault();
                        clearTimeRange('input__startTimeReception', 'startTimeReception');
                    }}>clear</button>
            </label>
            <label className='filter-list__label'>
                End of reception:
                <input className="filter-list__time-input input__endTimeReception" type="time" onChange={(e) => setTimeRange(e.target.value, 'endTimeReception', 'start')}></input>
                -
                <input className="filter-list__time-input input__endTimeReception" type="time" onChange={(e) => setTimeRange(e.target.value, 'endTimeReception', 'end')}></input>
                <button className="clear-time-input__btn"
                    onClick={(e) => {
                        e.preventDefault();
                        clearTimeRange('input__endTimeReception', 'endTimeReception');
                    }}>clear</button>
            </label>
        </form>
    )
};
export default ManagerFilterList;
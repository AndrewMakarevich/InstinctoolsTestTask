const UsersTypeFilter = ({ setUserType }: { setUserType: Function }) => {
    return (
        <form className="filter-list__form">
            <h3>User type:</h3>
            <label className='filter-list__label filter-list__radio-label'>
                Employee
                <input onChange={(e) => setUserType(e.target.value)} name="user-type__radio" value="employee" type="radio" className="filter-list__radio"></input>
                <span className="filter-list__radio-span"></span>
            </label>
            <label className='filter-list__label filter-list__radio-label'>
                Manager
                <input onChange={(e) => setUserType(e.target.value)} name="user-type__radio" value="manager" type="radio" className="filter-list__radio"></input>
                <span className="filter-list__radio-span"></span>
            </label>
            <label className='filter-list__label filter-list__radio-label'>
                All
                <input onChange={(e) => setUserType(e.target.value)} name="user-type__radio" value="all" type="radio" className="filter-list__radio"></input>
                <span className="filter-list__radio-span"></span>
            </label>
        </form >
    )
};
export default UsersTypeFilter;
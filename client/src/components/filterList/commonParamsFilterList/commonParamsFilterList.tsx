const CommonParamsFilterList = ({ setFullNameParam, setPrimitiveFilterParam }: { setFullNameParam: Function, setPrimitiveFilterParam: Function }) => {
    return (
        <form className="filter-list__form">
            <h3>Common params:</h3>
            <label className='filter-list__label'>
                Name:
                <input
                    onChange={(e) => setFullNameParam('name', e.target.value)}
                    className='filter-list__input'></input>
                <span className="filter-list__input-styled-line"></span>
            </label>
            <label className='filter-list__label'>
                Surname:
                <input
                    onChange={(e) => setFullNameParam('surname', e.target.value)}
                    className='filter-list__input'>
                </input>
                <span className="filter-list__input-styled-line"></span>
            </label>
            <label className='filter-list__label'>
                Patronymic:
                <input
                    onChange={(e) => setFullNameParam('patronymic', e.target.value)}
                    className='filter-list__input'></input>
                <span className="filter-list__input-styled-line"></span>
            </label>
            <label className='filter-list__label'>
                Salary:
                <input
                    onChange={(e) => { setPrimitiveFilterParam('salary', e.target.value) }}
                    className='filter-list__input'></input>
                <span className="filter-list__input-styled-line"></span>
            </label>
        </form>
    )
}
export default CommonParamsFilterList;
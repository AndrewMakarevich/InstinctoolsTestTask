const SortList = ({ setSortType }: { setSortType: Function }) => {
    return (
        <form>
            <select onChange={(e) => setSortType(e.target.value)}>
                <optgroup label="Sort by name">
                    <option value='{"param":"fullName.name", "type":1}'>Sort by name from A to Z</option>
                    <option value='{"param":"fullName.name", "type":-1}'>Sort by name from Z to A</option>
                </optgroup>
                <optgroup label="Sort by salary">
                    <option value='{"param":"salary", "type":1}'>Sort by salary ascending</option>
                    <option value='{"param":"salary", "type":-1}'>Sort by salary descending</option>
                </optgroup>
                <optgroup label="Sort by date of creation">
                    <option value='{"param":"createdAt", "type":1}'>Sort by date of creation ascending</option>
                    <option value='{"param":"createdAt", "type":-1}'>Sort by date of creation descending</option>
                </optgroup>
            </select>
        </form>
    )
};
export default SortList;
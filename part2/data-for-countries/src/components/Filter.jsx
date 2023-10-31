const Filter = ({ searchText, handleChangeSearchText }) => {
    return (
        <form>
            find countries
            <input type='text' value={searchText} onChange={handleChangeSearchText}/>
        </form>
    )
}

export default Filter
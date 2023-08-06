function Filter({onFilterValueChange}) {
    return (
        <div>
            filter shown with: <input type="text" onChange={onFilterValueChange}/>
        </div>
    )
}


export default Filter
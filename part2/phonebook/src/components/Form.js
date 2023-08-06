function Form({onFormSubmit, onNameChange, onNumberChange,name,number}) {
    return (
        <>
            <h2>add a new</h2>
            <form onSubmit={onFormSubmit}>
                <div>
                    name: <input onChange={onNameChange} value={name}/>
                </div>
                <div>
                    number: <input onChange={onNumberChange} value={number}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </>

    )
}

export default Form
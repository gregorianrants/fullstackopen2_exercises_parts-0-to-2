function Flash({message,color='green'}){
    const style = {
        color: color,
        border: '3px solid',
        marginBottom: 15,
        padding: '1.5rem 1rem',
        backgroundColor: 'silver'
    }
    console.log(message)

    return(
        message
            ?
            <div style={style}>
                {message}
            </div>
            :
            null)
}

export function SuccessFlash({message}){
    return (
        <Flash message={message} color='green'/>
    )
}

export function WarningFlash({message}){
    return (
        <Flash message={message} color='red'/>
    )
}
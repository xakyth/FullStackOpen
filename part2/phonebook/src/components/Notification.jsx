const Notification = ({text, isError}) => {
    if (text === null) return null
    let notificationStyle = {
        backgroundColor: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        color: 'green'
    }
    if (isError) notificationStyle.color = 'red'
    return (
        <div style={notificationStyle}>
            {text}
        </div>
    )
}

export default Notification
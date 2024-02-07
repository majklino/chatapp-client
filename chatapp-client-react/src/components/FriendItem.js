
const FriendItem = ({userId, username, picture, callbackWhenClicked}) => {

  const id = userId;
  const onClick = (e) => {
    callbackWhenClicked(id);
}

  return (
    <div className="friend-item" onClick={onClick}>
        <img className="friend-pic" src={picture}/>
        <h2>{username}</h2>
    </div>
  )
}

FriendItem.defaultProps = {
    picture: 'default-user.png'
}

export default FriendItem
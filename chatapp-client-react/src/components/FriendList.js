import FriendItem from "./FriendItem"

const FriendList = ({ users, callbackWhenFriendContextChanged }) => {
  const onFriendClick = (friendId) => {
    callbackWhenFriendContextChanged(friendId);
  }

  return (
    <div id="friendList">
      {users.map((user) => (
        <FriendItem userId={user.id} username={user.username} callbackWhenClicked={onFriendClick} />
      ))}
    </div>
  )
}

export default FriendList
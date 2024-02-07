
const Button = ({color, text, callbackWhenClicked}) => {
  const onClick = (e) => {
    callbackWhenClicked();
  }

  return (
    <button style={{backgroundColor: color}} className="btn" onClick={onClick}>
        {text}
    </button>
  )
}

export default Button

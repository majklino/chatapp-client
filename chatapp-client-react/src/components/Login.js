import $ from 'jquery';

const Login = ({ callbackWhenLogin, callbackWhenError }) => {
    const login = (username, password, callback) => {
        $.post('http://localhost:5001/login',
            {
                username: username,
                password: password
            }, (data, status) => {
                callback(data);
            });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        let username = document.getElementById('usernameLogin').value;
        let password = document.getElementById('passwordLogin').value;
        login(username, password, (result) => {
            if (result.success != null) {
                callbackWhenLogin(result);
            }
            else{
                callbackWhenError();
            }
        });
    };

    return (
        <div>
            <form>
                <label for="username">Username:</label>
                <input type="text" id="usernameLogin" name="username" required />

                <label for="password">Password:</label>
                <input type="password" id="passwordLogin" name="password" required />

                <button type="submit" onClick={onSubmit}>Login</button>
            </form>
        </div>
    )
}

export default Login

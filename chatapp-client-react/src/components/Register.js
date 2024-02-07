import $ from 'jquery';

const Register = ({ callbackWhenRegister, callbackWhenError }) => {
    const register = (username, password, callback) => {
        $.post('http://localhost:5001/register',
            {
                username: username,
                password: password,
                public_key: ''
            }, (data, status) => {
                callback(data);
            });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        let username = document.getElementById('usernameRegister').value;
        let password = document.getElementById('passwordRegister').value;
        register(username, password, (result) => {
            if (result.success != null) {
                callbackWhenRegister(result);
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
                <input type="text" id="usernameRegister" name="username" required />

                <label for="password">Password:</label>
                <input type="password" id="passwordRegister" name="password" required />

                <button type="submit" onClick={onSubmit}>Register</button>
            </form>
        </div>
    )
}

export default Register

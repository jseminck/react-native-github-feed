import AuthService from './AuthService';

export function onStartupLogin() {
    return (dispatch) => {
        AuthService.getAuthInfo((err, result) => {
            if (err) {
                return dispatch(onLoginFailed(err));
            }

            return dispatch(onLoginSuccess(result));
        });
    };
}

export function onUsernameChange(username) {
    return {
        type: 'ON_USERNAME_CHANGE',
        username
    };
}

export function onPasswordChange(password) {
    return {
        type: 'ON_PASSWORD_CHANGE',
        password
    };
}

export function onLoginClick(user) {
    return (dispatch) => {
        dispatch(onToggleLoading());

        AuthService.login(user.username, user.password, (err, result) => {
            if (err) {
                return dispatch(onLoginFailed(err));
            }

            return dispatch(onLoginSuccess(result));
        });
    };
}

function onToggleLoading() {
    return {
        type: 'ON_TOGGLE_LOADING'
    };
}

function onLoginSuccess(user) {
    return {
        type: 'ON_LOGIN_SUCCESS',
        user
    };
}

function onLoginFailed(errorMessage) {
    return {
        type: 'ON_LOGIN_FAILED',
        errorMessage
    };
}

export function onLogout() {
    return (dispatch) => {
        AuthService.logout(() => {
            return dispatch({
                type: 'ON_LOGOUT'
            });
        });
    };
}

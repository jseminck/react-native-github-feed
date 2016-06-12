import AuthService from './AuthService';

export function onStartupLogin() {
    return function(dispatch) {
        AuthService.getAuthInfo((err, authInfo) => {
            if (err) {
                return dispatch(onLoginFailed(err));
            }

            return dispatch(onLoginSuccess(authInfo.user));
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

        AuthService.login(user.username, user.password, (err, user) => {
            if (err) {
                return dispatch(onLoginFailed(err));
            }

            return dispatch(onLoginSuccess(user));
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

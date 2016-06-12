export function onUserInfoLoad(user) {
    return (dispatch) => {
        dispatch(onToggleLoading());
        
        fetch(user.repos_url)
            .then(response => response.json())
            .then(json => dispatch(onUserInfoLoadSuccessful(json)));
    };
}

function onUserInfoLoadSuccessful(repos) {
    return {
        type: 'ON_USER_INFO_LOAD_SUCCESS',
        repos
    };
}

function onToggleLoading() {
    return {
        type: 'ON_TOGGLE_GITHUB_LOADING'
    };
}
import AuthService from './../Login/AuthService';

export function onGithubLoad(user) {
    return (dispatch) => {
        dispatch(onToggleLoading());

        // Double fetch... perhaps can use async/await here with Promise.all??
        AuthService.getAuthInfo((err, authInfo) => {
            fetch(user.repos_url)
                .then(response => response.json())
                .then(json => dispatch(onUserInfoLoadSuccessfull(json)))
                .then(() => {
                    fetch(user.received_events_url, {headers: authInfo.header})
                        .then(response => response.json())
                        .then(json => dispatch(onFeedLoadSuccessfull(json)))
                        .then(() => dispatch(onToggleLoading()));
                });
        });
    };
}

function onToggleLoading() {
    return {
        type: 'ON_TOGGLE_GITHUB_LOADING'
    };
}

function onUserInfoLoadSuccessfull(repos) {
    return {
        type: 'ON_USER_INFO_LOAD_SUCCESS',
        repos
    };
}

function onFeedLoadSuccessfull(feed) {
    return {
        type: 'ON_FEED_LOAD_SUCCESS',
        feed
    };
}

export function onChangeTab(tab) {
    return {
        type: 'ON_CHANGE_TAB',
        tab
    }
}
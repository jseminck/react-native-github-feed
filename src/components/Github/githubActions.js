import AuthService from './../Login/AuthService';

// export async function onGithubLoad(user) {
//     return (dispatch) => {
//         dispatch(onToggleLoading());
//
//         // Double fetch... perhaps can use async/await here with Promise.all??
//         AuthService.getAuthInfo(async (err, authInfo) => {
//             const userResponse = await fetch(user.repos_url);
//             const userJson = await userResponse.json();
//             dispatch(onUserInfoLoadSuccessfull(userJson));
//
//             const feedResponse = await fetch(user.received_events_url, {headers: {authInfo}});
//             const feedJson = feedResponse.json();
//             dispatch(onFeedLoadSuccessfull(feedJson, 1));
//             dispatch(onToggleLoading());
//         });
//     };
// }

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
                        .then(json => dispatch(onFeedLoadSuccessfull(json, 1)))
                        .then(() => dispatch(onToggleLoading()));
                });
        });
    };
}


export function onLoadMore() {
    return (dispatch, getState) => {
        // TODO: Get user and currentPage from store
        const user = getState().login.user;
        const currentPage = getState().github.page;

        // Double fetch... perhaps can use async/await here with Promise.all??
        AuthService.getAuthInfo((err, authInfo) => {
            fetch(`${user.received_events_url}?page=${currentPage + 1}`, {headers: authInfo.header})
                .then(response => response.json())
                .then(json => dispatch(onFeedLoadSuccessfull(json, currentPage + 1)));
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

function onFeedLoadSuccessfull(feed, page) {
    return {
        type: 'ON_FEED_LOAD_SUCCESS',
        feed,
        page
    };
}

export function onChangeTab(tab) {
    return {
        type: 'ON_CHANGE_TAB',
        tab
    };
}
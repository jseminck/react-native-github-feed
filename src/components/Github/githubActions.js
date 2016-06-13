import AuthService from './../Login/AuthService';

export function onGithubLoad(user) {
    return async (dispatch) => {
        dispatch(onToggleLoading());

        // Double fetch... perhaps can use async/await here with Promise.all??
        const authInfo = await AuthService.getAuthInfo();

        const reposResponse = await fetch(user.repos_url);
        const reposJson = await reposResponse.json();
        dispatch(onUserInfoLoadSuccessfull(reposJson));

        const feedResponse = await fetch(user.received_events_url, {headers: {authInfo}});
        const feedJson = await feedResponse.json();
        dispatch(onFeedLoadSuccessfull(feedJson, 1));
        dispatch(onToggleLoading());
    };
}

export function onLoadMore() {
    return async (dispatch, getState) => {
        const user = getState().login.user;
        const currentPage = getState().github.page;

        // Double fetch... perhaps can use async/await here with Promise.all??
        const authInfo = await AuthService.getAuthInfo();
        const response = await fetch(`${user.received_events_url}?page=${currentPage + 1}`, {headers: authInfo.header});
        const json = await response.json();
        dispatch(onFeedLoadSuccessfull(json, currentPage + 1));
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
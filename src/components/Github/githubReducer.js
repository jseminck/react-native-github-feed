import _ from 'lodash';

const initialState = {
    loading: false,
    repos: []
};

export default function github(state = initialState, action = {}) {
    switch (action.type) {
    case 'ON_TOGGLE_GITHUB_LOADING':
        return onToggleLoading(state);
    case 'ON_USER_INFO_LOAD_SUCCESS':
        return onUserInfoLoadSuccess(state, action.repos);
    default:
        return state;
    }
}

function onToggleLoading(state) {
    return {
        ...state,
        loading: !state.loading
    };
}

function onUserInfoLoadSuccess(state, repos) {
    return {
        ...state,
        loading: false,
        repos: _.orderBy(repos, 'updated_at', 'desc')
    };
}
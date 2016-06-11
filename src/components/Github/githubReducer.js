const initialState = {
    loading: false
};

export default function github(state = initialState, action = {}) {
    switch (action.type) {
    case 'ON_TOGGLE_GITHUB_LOADING':
        return onToggleLoading(state);
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

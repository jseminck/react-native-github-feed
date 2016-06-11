const initialState = {
    month: 1,
    year: 2000,
    loading: false,
    data: [],
    categories: []
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
    console.log("onToggleLoading");
    return {
        ...state,
        loading: !state.loading
    };
}

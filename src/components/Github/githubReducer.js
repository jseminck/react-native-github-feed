const initialState = {
    month: 1,
    year: 2000,
    loading: false,
    data: [],
    categories: []
};

export default function counter(state = initialState, action = {}) {
    switch (action.type) {
    case 'ON_TOGGLE_LOADING':
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

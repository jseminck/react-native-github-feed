import React from 'react-native';

const routes = {};

/**
 * Homepage
 *
 */
routes.getGithubRoute = () => ({
    getSceneClass() {
        return require('../components/Github/TabsOrSwiperScreen').default;
    },
    getTitle() {
        return 'Github';
    }
});

routes.getFeedDetail = (rowData) => ({
    // using renderScene since we want to pass props data to the detail component
    renderScene(navigator) {
        let FeedDetail = require('../components/Github/FeedDetail').default;
        return (
            <FeedDetail
                navigator={navigator}
                eventDetail={rowData}
            />
        );
    },
    getTitle() {
        return 'Feed Detail';
    }
});

routes.getLoginRoute = () => ({
    getSceneClass() {
        return require('../components/Login/LoginScreen').default;
    },
    getTitle() {
        return 'Login';
    }
});

export default routes;

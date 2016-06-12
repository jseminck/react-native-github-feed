import React from 'React';

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

routes.getFeedDetailComment = (rowData) => ({
    // using renderScene since we want to pass props data to the detail component
    renderScene(navigator) {
        let DetailComment = require('../components/Github/Feed/DetailComment').default;
        return (
            <DetailComment
                navigator={navigator}
                eventDetail={rowData}
            />
        );
    },
    getTitle() {
        return 'Feed Detail';
    }
});

routes.getFeedDetailPush = (rowData) => ({
    // using renderScene since we want to pass props data to the detail component
    renderScene(navigator) {
        let DetailPush = require('../components/Github/Feed/DetailPush').default;
        return (
            <DetailPush
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

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

routes.getFeedDetail = () => ({
    getSceneClass() {
        return require('../components/Github/FeedDetail').default;
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

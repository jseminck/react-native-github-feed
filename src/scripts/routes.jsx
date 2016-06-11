const routes = {};

/**
 * Homepage
 *
 */
routes.getGithubRoute = () => ({
    getSceneClass() {
        return require('../components/Github/SwiperScreen').default;
    },
    getTitle() {
        return 'Github';
	}
});

routes.getLoginRoute = () => ({
    getSceneClass() {
        return require('../components/Login/LoginScreen').default;
    },
    getTitle() {
        return 'Login';
    }
})

export default routes;

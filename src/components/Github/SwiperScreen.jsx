import Swiper from 'react-native-swiper';
import React, { View, TabBarIOS } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as githubActions from './githubActions';
import {onLogout} from './../Login/loginActions';
import routes from './../../scripts/routes';

import Loading from './Loading';
import Feed from './Feed';
import User from './User';
import Stats from './Stats';

class SwiperScreen extends React.Component {
    static propTypes = {
        state: React.PropTypes.object.isRequired,
        user: React.PropTypes.object,
        navigator: React.PropTypes.object.isRequired,

        onLogout: React.PropTypes.func.isRequired
    };

    componentWillReceiveProps(nextProps) {
        if (!nextProps.loggedIn) {
            let route = routes.getLoginRoute();
            this.props.navigator.replace(route);
        }
    }

    render() {
        if (this.props.state.loading) {
            return <Loading />;
        }

        return (
            <TabBarIOS>
                <TabBarIOS.Item
                    title='Github Feed'
                    selected={true}
                    icon={require('./feed.png')}
                >
                    {this.renderSwiper()}
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title='Log out'
                    selected={true}
                    icon={require('./signout.png')}
                    onPress={::this.logout}
                >
                    {this.renderSwiper()}
                </TabBarIOS.Item>
            </TabBarIOS>
        );
    }

    logout() {
        this.props.onLogout();
    }

    renderSwiper() {
        return (
            <Swiper showsButtons={false}>
                <View>
                    <Feed />
                </View>
                <View>
                    <User />
                </View>
                <View>
                    <Stats />
                </View>
            </Swiper>
        );
    }
}

function mapStateToProps(state) {
    return {
        state: state.github,
        user: state.login.user
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign(githubActions, {onLogout}), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SwiperScreen);


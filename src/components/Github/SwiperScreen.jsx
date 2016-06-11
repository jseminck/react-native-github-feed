import Swiper from 'react-native-swiper';
import React, { View, TabBarIOS, Text } from 'react-native';
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
        user: React.PropTypes.object
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
                    title="Github Feed"
                    selected={true}
                    icon={require("./feed.png")}
                >
                    {this.renderSwiper()}
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="Log out"
                    selected={true}
                    icon={require("./signout.png")}
                    onPress={() => this.props.onLogout()}
                >
                    {this.renderSwiper()}
                </TabBarIOS.Item>
            </TabBarIOS>
        );
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

const styles = {
    tab: {
        fontSize: 14,
        color: "black"
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

export default connect(mapStateToProps, mapDispatchToProps)(SwiperScreen)


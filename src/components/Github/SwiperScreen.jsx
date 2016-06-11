import Swiper from 'react-native-swiper';
import React, { View } from 'react-native';
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
        user: React.PropTypes.object.isRequired
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
            <Swiper showsButtons={false}>
                <View>
                    <Feed onLogout={this.props.onLogout} />
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
        loggedIn: state.login.loggedIn
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign(githubActions, {onLogout}), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SwiperScreen)


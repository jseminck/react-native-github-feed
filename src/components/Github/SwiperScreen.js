import Swiper from 'react-native-swiper';
import React from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as githubActions from './githubActions';
import {onLogout} from './../Login/loginActions';
import routes from './../../scripts/routes';

import Loading from './Loading';
import Feed from './Feed';
import User from './User';
import Logout from './Logout';

class SwiperScreen extends React.Component {
    static propTypes = {
        state: React.PropTypes.object.isRequired,
        user: React.PropTypes.object,
        loggedIn: React.PropTypes.bool,
        navigator: React.PropTypes.object.isRequired,

        onLogout: React.PropTypes.func.isRequired,
        onLoadMore: React.PropTypes.func.isRequired,
        onGithubLoad: React.PropTypes.func.isRequired
    };

    componentDidMount() {
        if (this.props.loggedIn) {
            this.props.onGithubLoad(this.props.user);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.loggedIn !== nextProps.loggedIn && !nextProps.loggedIn) {
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
                <Feed
                    navigator={this.props.navigator}
                    feed={this.props.state.feed}
                    onLoadMore={this.props.onLoadMore}
                />
                <User
                    user={this.props.user}
                    repos={this.props.state.repos}
                />
                <Logout onLogout={this.props.onLogout} />
            </Swiper>
        );
    }
}

function mapStateToProps(state) {
    return {
        state: state.github,
        user: state.login.user,
        loggedIn: state.login.loggedIn
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign(githubActions, {onLogout}), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SwiperScreen);


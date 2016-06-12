import React, { View, TabBarIOS } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as githubActions from './githubActions';
import {onLogout} from './../Login/loginActions';
import routes from './../../scripts/routes';

import Loading from './Loading';
import Feed from './Feed';
import User from './User';

class TabsScreen extends React.Component {
    static propTypes = {
        state: React.PropTypes.object.isRequired,
        user: React.PropTypes.object,
        loggedIn: React.PropTypes.bool,
        navigator: React.PropTypes.object.isRequired,

        onLogout: React.PropTypes.func.isRequired,
        onGithubLoad: React.PropTypes.func.isRequired,
        onChangeTab: React.PropTypes.func.isRequired
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
            <TabBarIOS>
                <TabBarIOS.Item
                    title='Github Feed'
                    selected={this.props.state.selectedTab === 'feed'}
                    onPress={this.changeTab.bind(this, 'feed')}
                    icon={require('./feed.png')}
                >
                    <View style={{
                        flex: 1
                    }}>
                        <Feed feed={this.props.state.feed} />
                    </View>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title='User Info'
                    selected={this.props.state.selectedTab === 'user'}
                    onPress={this.changeTab.bind(this, 'user')}
                    icon={require('./user.png')}
                >
                    <View>
                        <User
                            user={this.props.user}
                            repos={this.props.state.repos}
                        />
                    </View>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title='Log out'
                    selected={false}
                    icon={require('./signout.png')}
                    onPress={::this.logout}
                >
                </TabBarIOS.Item>
            </TabBarIOS>
        );
    }

    logout() {
        this.props.onLogout();
    }

    changeTab(tab) {
        this.props.onChangeTab(tab);
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

export default connect(mapStateToProps, mapDispatchToProps)(TabsScreen);


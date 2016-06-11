import React, { Text, TouchableHighlight, View, ListView } from 'react-native';

class Feed extends React.Component {
    static propTypes = {
        onLogout: React.PropTypes.func.isRequired
    }

    render() {
        return (
            <View>
                <Text>
                    Github Feed
                </Text>
                <TouchableHighlight onPress={this.props.onLogout}>
                    <Text>
                        Logout
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }
}

export default Feed;

import React, { Text, View, TouchableHighlight } from 'react-native';

export default class Logout extends React.Component {
    static propTypes = {
        onLogout: React.PropTypes.func.isRequired
    }

    render() {
        return (
            <TouchableHighlight onPress={this.props.onLogout}>
                <View style={styles.container}>
                    <Text>
                        Logout ...
                    </Text>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = {
    container: {
        marginTop: 300,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
};

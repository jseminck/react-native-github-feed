import React from 'react';
import { View, TouchableHighlight, Text } from 'react-native';

export default class LoadMoreButton extends React.Component {
    static propTypes = {
        onLoadMore: React.PropTypes.func.isRequired
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight
                    underlayColor='white'
                    activeOpacity={1}
                    onPress={::this.props.onLoadMore}
                >
                    <Text style={styles.text}>
                        PLZ MORE
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = {
    container: {
        marginTop: 10,
        marginBottom: 10,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    text: {
        width: 100,
        height: 100,
        borderWidth: 2,
        borderColor: '#45698F',
        borderRadius: 50,
        paddingTop: 40,
        paddingLeft: 13,
        color: '#45698F',
        fontWeight: 'bold'
    }
}
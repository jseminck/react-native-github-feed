import React, { View, Text, Image, TouchableHighlight } from 'react-native';
import moment from 'moment';
import routes from './../../scripts/routes';

export default class FeedRow extends React.Component {
    static propTypes = {
        navigator: React.PropTypes.object.isRequired,
        rowData: React.PropTypes.object.isRequired
    }

    render() {
        return (
            <TouchableHighlight
                onPress={::this.onPress}
                underlayColor='#DDD'
            >
                <View style={styles.container}>
                    <Image
                        source={{uri: this.props.rowData.actor.avatar_url}}
                        style={styles.userIcon}
                    />
                <View style={styles.textContainer}>
                        <Text style={styles.textItem}>
                            {moment(this.props.rowData.created_at).fromNow()}
                        </Text>
                        <Text style={styles.textItem}>
                            {this.props.rowData.actor.login}
                        </Text>
                        <Text style={styles.textItem}>
                            {this.props.rowData.repo.name}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    onPress() {
        let route = routes.getFeedDetail();
        this.props.navigator.push(route);
    }
}

const styles = {
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
        borderColor: '#D7D7D7',
        borderBottomWidth: 1
    },
    userIcon: {
        width: 36,
        height: 36,
        borderRadius: 18
    },
    textContainer: {
        paddingLeft: 20
    },
    textItem: {
        backgroundColor: '#fff'
    }
};
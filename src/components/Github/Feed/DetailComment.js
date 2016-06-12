import React from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import moment from 'moment';

export default class DetailComment extends React.Component {
    static propTypes = {
        eventDetail: React.PropTypes.object.isRequired
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Image
                        source={{uri : this.props.eventDetail.actor.avatar_url}}
                        style={styles.image}
                    />
                    <Text style={styles.name}>
                        {moment(this.props.eventDetail.created_at).fromNow()}
                    </Text>
                    <Text>
                        {this.props.eventDetail.actor.login} comment an issue
                    </Text>
                    <Text>
                        at {this.props.eventDetail.repo.name}
                    </Text>
                    {this.renderIssueComment()}
                </View>
            </ScrollView>
        );
    }

    renderIssueComment() {
        return (
            <View style={styles.container}>
                <View style={styles.issueContainer}>
                    <Text style={styles.issueTitle}>
                        {this.props.eventDetail.payload.issue.title}
                    </Text>
                    <Text style={styles.issueBody}>
                        {this.props.eventDetail.payload.comment.body}
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = {
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1
    },
    image: {
        borderRadius: 100,
        height: 200,
        width: 200
    },
    name: {
        marginTop: 20,
        fontSize: 24
    },
    issueContainer: {
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 10,
        padding: 20,
        backgroundColor: '#45698F',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    issueTitle: {
        color: 'white',
        fontWeight: 'bold'
    },
    issueBody: {
        color: 'white',
        marginTop: 5
    }
};
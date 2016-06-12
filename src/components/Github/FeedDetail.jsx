import React, { Text, View, Image, ScrollView } from 'react-native';

export default class FeedRow extends React.Component {
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
                        {this.props.eventDetail.actor.login}
                    </Text>
                    {this.renderIssueComment()}
                </View>
            </ScrollView>
        );
    }

    renderIssueComment() {
        if (this.props.eventDetail.type === 'IssueCommentEvent') {
            return (
                <View style={styles.container}>
                    <Text style={styles.typeInfo}>
                        Comment on issue at {this.props.eventDetail.repo.name}
                    </Text>
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
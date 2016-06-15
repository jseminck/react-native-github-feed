import React from 'react';
import { Text, View, Image, ScrollView, ListView } from 'react-native';
import moment from 'moment';

export default class DetailComment extends React.Component {
    static propTypes = {
        eventDetail: React.PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);

        const dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.state = {
            dataSource: dataSource.cloneWithRows(this.props.eventDetail.payload.commits)
        };
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
                        {this.props.eventDetail.actor.login} pushed to
                    </Text>
                    <Text>
                        {this.props.eventDetail.payload.ref.replace('refs/heads/', '')}
                    </Text>
                    <Text>
                        at {this.props.eventDetail.repo.name}
                    </Text>
                    {this.renderCommits()}
                </View>
            </ScrollView>
        );
    }

    renderCommits() {
        return (
            <View style={styles.container}>
                <Text style={styles.name}>
                    {this.props.eventDetail.payload.commits.length} commit(s)
                </Text>
                <ListView
                    enableEmptySections={true}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                />
            </View>
        );
    }

    renderRow(rowData) {
        return (
            <View style={styles.issueContainer}>
                <Text style={styles.issueTitle}>
                    {rowData.sha.substring(1, 6)} - {rowData.message}
                </Text>
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
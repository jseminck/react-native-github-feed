import React, { Text, View, Image, ListView } from 'react-native';

class User extends React.Component {
    static propTypes = {
        user: React.PropTypes.object.isRequired,
        repos: React.PropTypes.array.isRequired
    }

    constructor(props) {
        super(props);

        const dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.state = {
            dataSource: dataSource.cloneWithRows(this.props.repos)
        };
    }

    render() {
        return (
            <View style={{
                justifyContent: 'flex-start',
                alignItems: 'center'
            }}>
                <Image
                    source={{uri : this.props.user.avatar_url}}
                    style={styles.image}
                />
            <Text style={styles.name}>
                    {this.props.user.name}
                </Text>
                <Text style={styles.info}>
                    {this.props.user.company} / {this.props.user.location}
                </Text>
                <ListView
                    dataSource={this.state.dataSource}
                    style={styles.listView}
                    renderRow={this.renderRepo}
                />
            </View>
        );
    }

    renderRepo(rowData) {
        return (
            <Text style={styles.repo}>
                {rowData.name}
            </Text>
        );
    }
}

const styles = {
    image: {
        borderRadius: 100,
        height: 200,
        width: 200
    },
    name: {
        marginTop: 20,
        fontSize: 24
    },
    info: {
        marginTop: 10, fontSize: 12
    },
    listView: {
        marginTop: 30,
        padding: 30,
        backgroundColor: '#45698F'
    },
    repo: {
        color: 'white'
    }
}

export default User;

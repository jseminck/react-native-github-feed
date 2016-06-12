import React, { Text, View, ListView, Image } from 'react-native';
import moment from 'moment';

class Feed extends React.Component {
    static propTypes = {
        feed: React.PropTypes.array.isRequired
    }

    constructor(props) {
        super(props);

        const dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.state = {
            dataSource: dataSource.cloneWithRows(this.props.feed)
        };
    }

    render() {
        return (
            <View style={{
                flex: 1
            }}>
                <ListView
                    style={{flex: 1}}
                    dataSource={this.state.dataSource}
                    renderRow={::this.renderRow}
                />
            </View>
        );
    }

    renderRow(rowData) {
        console.log("rowData", rowData);
        return (
            <View style={{
                flex: 1,
                flexDirection: 'row',
                padding: 20,
                alignItems: 'center',
                borderColor: '#D7D7D7',
                borderBottomWidth: 1
            }}>
                <Image
                    source={{uri: rowData.actor.avatar_url}}
                    style={{width: 36, height: 36, borderRadius: 18}}
                />
                <View style={{
                    paddingLeft: 20
                }}>
                    <Text style={{backgroundColor: '#fff'}}>
                        {moment(rowData.created_at).fromNow()}
                    </Text>
                    <Text style={{backgroundColor: '#fff'}}>
                        {rowData.actor.login}
                    </Text>
                    <Text style={{backgroundColor: '#fff'}}>
                        {rowData.repo.name}
                    </Text>
                </View>
            </View>
        );
    }
}

export default Feed;

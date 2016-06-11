import React, { Text, View, ListView } from 'react-native';

class Feed extends React.Component {
    static propTypes = {
    }

    constructor(props) {
        super(props);

        const dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.state = {
            dataSource: dataSource.cloneWithRows(['a', 'b', 'c'])
        };
    }

    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'flex-start'
            }}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={::this.renderRow}
                />
            </View>
        );
    }

    renderRow(rowData) {
        return (
            <Text>
                {rowData}
            </Text>
        );
    }
}

export default Feed;

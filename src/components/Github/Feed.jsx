import React, { View, ListView } from 'react-native';
import FeedRow from './FeedRow';

class Feed extends React.Component {
    static propTypes = {
        navigator: React.PropTypes.object.isRequired,
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
            <View style={styles.view}>
                <ListView
                    style={styles.view}
                    dataSource={this.state.dataSource}
                    renderRow={::this.renderRow}
                />
            </View>
        );
    }

    renderRow(rowData) {
        return (
            <FeedRow
                navigator={this.props.navigator}
                rowData={rowData}
            />
        );
    }
}

const styles = {
    view: {
        flex: 1
    }
};

export default Feed;

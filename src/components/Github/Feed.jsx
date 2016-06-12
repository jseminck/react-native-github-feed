import React, { View, ListView, TouchableHighlight, Text } from 'react-native';
import FeedRow from './FeedRow';
import LoadMoreButton from './LoadMoreButton';

class Feed extends React.Component {
    static propTypes = {
        navigator: React.PropTypes.object.isRequired,
        feed: React.PropTypes.array.isRequired,

        onLoadMore: React.PropTypes.func.isRequired
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

    componentWillReceiveProps(nextProps) {
        if (nextProps.feed !== this.props.feed) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.feed)
            });
        }
    }

    render() {
        return (
            <View style={styles.view}>
                <ListView
                    style={styles.view}
                    dataSource={this.state.dataSource}
                    renderRow={::this.renderRow}
                    renderFooter={::this.renderFooter}
                >
                </ListView>
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

    renderFooter() {
        return (
            <LoadMoreButton onLoadMore={this.props.onLoadMore} />
        );
    }
}

const styles = {
    view: {
        flex: 1
    }
};

export default Feed;

import React from 'react-native';
import config from './../../config';

import TabsScreen from './TabsScreen';
import SwiperScreen from './SwiperScreen';

class TabsOrSwiperScreen extends React.Component {
    static propTypes = {
        navigator: React.PropTypes.object.isRequired
    };

    render() {
        if (config.navigation === 'tabs') {
            return <TabsScreen navigator={this.props.navigator} />;
        }

        return <SwiperScreen navigator={this.props.navigator} />;
    }
}

export default TabsOrSwiperScreen;


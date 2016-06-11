import React, { Component } from 'react-native';
import { Provider } from 'react-redux';
import ExNavigator from '@exponent/react-native-navigator';
import configureStore from '../configStore';
import routes from '../routes';

export default class App extends Component{

    /**
     * Render
     *
     * @return {jsx} Render <Provider /> component
     */
    render(){
        return (
            <Provider store={configureStore()}>
                <ExNavigator
                    initialRoute={routes.getLoginRoute()}
                    style={{flex: 1}}
                    sceneStyle={{paddingTop: 64}}
                />
            </Provider>
        );
    }

}

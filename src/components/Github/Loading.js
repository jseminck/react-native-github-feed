import React from 'react';
import { View, Text, ActivityIndicatorIOS } from 'react-native';

export default () => {
    return (
        <View style={styles.container}>
            <Text>
                Loading
            </Text>
            <ActivityIndicatorIOS
                animating={true}
                size='large'
                style={styles.activityIndicator}
            />
        </View>
    );
};

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    activityIndicator: {
        marginTop: 15
    }
};
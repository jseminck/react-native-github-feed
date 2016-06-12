import React from 'react';
import { View, Text } from 'react-native';

export default () => {
    return (
        <View style={styles.container}>
            <Text>
                Logout ...
            </Text>
        </View>
    );
};

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
};
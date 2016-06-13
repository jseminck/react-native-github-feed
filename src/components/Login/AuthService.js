import buffer from 'buffer';
import {AsyncStorage} from 'react-native';
import config from './../../config';

const authKey = 'auth';
const userKey = 'user';

class AuthService {
    /**
     *
     * @returns {Promise}
     */
    getAuthInfo() {
        return new Promise(async (resolve, reject) => {
            try {
                const values = await AsyncStorage.multiGet([authKey, userKey]);
                if (!values) {
                    throw 'Caching issue';
                }

                // Transforms [[key1, value1], [key2, value2]] to {key1: value1, key2: value2}
                const data = values.reduce((data, keyValueArr) => {
                    return Object.assign(data, {[keyValueArr[0]]: keyValueArr[1]});
                }, {});

                if (!data[authKey] || !data[userKey] || data[authKey] === '' || data[userKey] === '') {
                    throw 'Caching issue';
                }

                const authInfo = {
                    header: {
                        'Authorization': `Basic ${data[authKey]}`
                    },
                    user: JSON.parse(data[userKey])
                };

                return resolve(authInfo);
            } catch (err) {
                reject();
            }
        });
    }

    /**
     * Login to Github, using basic Authorization.
     *
     * Encodes the user name and password to base65, and then sends
     * a GET request to Github API using that data.
     *
     * Returns a fetch promise.
     *
     * @param {String} username
     * @param {String} password
     * @returns {Promise}
     */
    login(username, password) {
        return new Promise(async (resolve, reject) => {
            // Use pre-created data to skip login credentials.
            if (config.testUser) {
                username = config.testUser.username;
                password = config.testUser.password;
            }

            const auth = buffer.Buffer(`${username}:${password}`)
                .toString('base64');

            try {
                const response = await fetch('https://api.github.com/user', {
                    headers: {
                        'Authorization': `Basic ${auth}`
                    }
                });

                if (response.status === 401) {
                    throw 'Bad credentials';
                }
                else if ( response.status < 200 || response.status >= 300) {
                    throw 'Unexpected error';
                }

                const json = await response.json();
                await AsyncStorage.multiSet([
                    [authKey, auth],
                    [userKey, JSON.stringify(json)]
                ]);

                resolve(json);
            } catch(err) {
                reject(err);
            }
        });
    }

    /**
     * For some reason. using AsyncStorage.multiRemove and clear did not work, so overriding
     * the values to be empty strings instead as a workaround...
     *
     * @returns {Promise}
     */
    logout() {
        return new Promise(async (resolve, reject) => {
            try {
                await AsyncStorage.clear();
                resolve();
            } catch(err) {
                reject(err);
            }
        });
    }
}

export default new AuthService();
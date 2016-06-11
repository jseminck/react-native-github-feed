import buffer from 'buffer';
import {AsyncStorage} from 'react-native';
import config from './../../config';

const authKey = 'auth';
const userKey = 'user';

class AuthService {
    /**
     *
     * @param {Function} callback
     */
    getAuthInfo(callback) {
        AsyncStorage.multiGet([authKey, userKey], (err, val) => {
            if (err) return callback(err);
            if (!val) return callback(true);

            // Transforms [[key1, value1], [key2, value2]] to {key1: value1, key2: value2}
            const data = val.reduce((data, keyValueArr) => {
                return Object.assign(data, {[keyValueArr[0]]: keyValueArr[1]});
            }, {});

            if (data[authKey] === '' || data[userKey] === '') {
                return callback(true);
            }

            const authInfo = {
                header: {
                    'Authorization': `Basic ${data[authKey]}`
                },
                user: data[userKey]
            };

            return callback(null, authInfo);
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
     * @param {Function} callback
     */
    login(username, password, callback) {
        // Use pre-created data to skip login credentials.
        if (config.testUser) {
            username = config.testUser.username;
            password = config.testUser.password;
        }

        const auth = buffer.Buffer(`${username}:${password}`)
            .toString('base64');

        return fetch('https://api.github.com/user', {
            headers: {
                'Authorization': `Basic ${auth}`
            }
        }).then(response => {
            if (response.status >= 200 && response.status < 300) {
                return response;
            }

            if (response.status === 401) {
                throw 'Bad credentials';
            }

            throw 'Unexpected error';
        })
        .then(response => response.json())
        .then(json => {
            AsyncStorage.multiSet([
                [authKey, auth],
                [userKey, JSON.stringify(json)]
            ], (err) => {
                if (err) {
                    return callback(err, null);
                }
                return callback(null, json);
            });
        })
        .catch(err => callback(err));
    }

    /**
     * For some reason. using AsyncStorage.multiRemove and clear did not work, so overriding
     * the values to be empty strings instead as a workaround...
     *
     * @param {Function} callback
     */
    logout(callback) {
        AsyncStorage.multiSet([
            [authKey, ''],
            [userKey, '']
        ], (err) => {
            if (err) {
                return callback(err);
            }
            return callback();
        });
    }
}

export default new AuthService();
import React from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

export const LoginScreen = ({navigation}) => {
    const [username, setUsername] = React.useState(null);
    const [password, setPassword] = React.useState(null);
    const [isError, setIsError] = React.useState(false);
    const correctPassword = '12345678';

    const login = () => {
        setIsError(false)
        password !== correctPassword 
            ? setIsError(true) 
            : navigateHome()
    }

    const navigateHome = () => navigation.navigate('Home', { userName: username })

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.subtitleText}>SimplyShop!</Text>
            </View>

            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <Icon name='account-circle' color='blue' size={40} />
                    <View>
                        <Text style={styles.labelText}>Username / E-Mail</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder='Masukkan username / email'
                            onChangeText={setUsername} />
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <Icon name='lock' color='blue' size={40} />
                    <View>
                        <Text style={styles.labelText}>Password</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder='Masukkan password'
                            onChangeText={setPassword} />
                    </View>
                </View>

                <Text style={isError ? styles.errorText: styles.hiddenErrorText}>username / password salah</Text>
                <Button title='Login' onPress={login} />
            </View>            
        </View>
    )
    
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'blue',
        textAlign: 'center'
    },
    subtitleText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'blue',
        alignSelf: 'flex-end',
        marginBottom: 40
    },
    formContainer: {
        justifyContent: 'center'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 16
    },
    labelText: {
        fontWeight: 'bold'
    },
    textInput: {
        width: 300,
        backgroundColor: 'white'
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 16
    },
    hiddenErrorText: {
        color: 'transparent',
        textAlign: 'center',
        marginBottom: 16
    }
})

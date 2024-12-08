import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/styles';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigation = useNavigation();

    const handleLogin = () => {
        // Clear previous errors
        setUsernameError('');
        setPasswordError('');
        if (!username) {
            setUsernameError('Username cannot be empty');
            return;
        }
        if (!password) {
            setPasswordError('Password cannot be empty');
            return;
        }
        const userSavedName = "Emman";
        const userSavedPassword = "mypassword01234";
        if (username !== userSavedName) {
            setUsernameError('Incorrect username');
            return;
        }
        if (password !== userSavedPassword) {
            setPasswordError('Incorrect password');
            return;
        }
        navigation.navigate("Main");
    };
    return (
        <View style={styles.centerContainer}>
            <Text style={styles.welcomeTitle}>WELCOME!</Text>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>USERNAME:</Text>
                <TextInput
                    placeholder="Enter your username"
                    value={username}
                    onChangeText={setUsername}
                    style={styles.textInput}
                />
                {usernameError ? <Text style={styles.errorText}>{usernameError}</Text> : null}
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>PASSWORD:</Text>
                <TextInput
                    placeholder="Enter your Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={styles.textInput}
                />
                {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
            </View>
            <Text style={styles.forgotPasswordText}>FORGOT PASSWORD?</Text>
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.registerLink} onPress={() => navigation.navigate("Signup")}>
                <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Login;

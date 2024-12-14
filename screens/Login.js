import React, { useState,useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/styles';
import * as SQLite from 'expo-sqlite';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigation = useNavigation();
    const [db, setDb] = useState(null);

    useEffect(() => {
        const initializeDB = async () => {
            const database = await SQLite.openDatabaseAsync('myApp');
            setDb(database);
        };
        initializeDB(); // Initialize DB once when the component mounts
    }, []);

    const handleLogin = async () => {
        // Reset error messages
        setUsernameError('');
        setPasswordError('');

        // Basic validation
        if (!username) {
            setUsernameError('Username cannot be empty');
            return;
        }
        if (!password) {
            setPasswordError('Password cannot be empty');
            return;
        }

        try {
            // Check if the username exists in the database
            const userResult = await db.getAllAsync('SELECT * FROM users WHERE username = ?', [username]);

            if (userResult.length === 0) {
                setUsernameError('Username does not exist');
                return;
            }

            // Now check if the password matches
            if (userResult[0].password !== password) {
                setPasswordError('Incorrect password');
                return;
            }

            // If both username and password are correct, proceed to login
            navigation.navigate("Main");

        } catch (error) {
            console.error("Error during login:", error);
            Alert.alert('Error', 'while trying to log in. Please try again.');
        }
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
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={styles.textInput}
                />
                {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
            </View>

            <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
                <Text style={styles.forgotPasswordText}>FORGOT PASSWORD?</Text>
            </TouchableOpacity>

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
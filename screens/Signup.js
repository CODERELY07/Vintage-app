import React, { useState , useEffect} from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/styles';
import * as SQLite from 'expo-sqlite';

const initDB = async () =>{
  const db = await SQLite.openDatabaseAsync('myApp');
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS users (
      userID INTEGER PRIMARY KEY NOT NULL, 
      email TEXT NOT NULL, 
      username TEXT NOT NULL, 
      password TEXT NOT NULL);
  `);
  console.log("Created database");
}
initDB();
const createUsers = async (email, username, password) =>{
  try{
    const db = await SQLite.openDatabaseAsync('myApp');
    const result = db.runAsync('INSERT INTO users (email, username, password) VALUES (?, ?, ?)', [email, username, password]);
    console.log(result.lastInsertRowId, result.changes);
  }catch(e){
    console.log(e);
  }
}
const selectUsers = async () =>{
  try{
    const db = await SQLite.openDatabaseAsync('myApp');
    const allRows = await db.getAllAsync('SELECT * FROM users');
for (const row of allRows) {
  console.log(row.userID, row.username, row.email, row.password);
}

  }catch(e){
    console.log(e);
  }
}
selectUsers();
const SignUp = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [isValid,setIsValid] = useState(false);
  const handleSignUp = () => {
    // Basic validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if(!username){
      setUsernameError("Please enter a username");
      setIsValid(false);
    }else if(username.length < 6){
      setUsernameError("Username should be at least 6 characters long");
      setIsValid(false);
    }else{
      setUsernameError("");
      setIsValid(true);
    }

    if (!email) {
      setEmailError("Please enter an email");
      setIsValid(false);
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      setIsValid(false);
    }else{
      setEmailError("");
      setIsValid(true);
    }

    if(!password){
      setPasswordError("Please enter a password");
      setIsValid(false);
    }else if(password.length < 6){
      setPasswordError("Password should be at least 6 characters long");
      setIsValid(false);
    }else{
      setPasswordError("");
      setIsValid(true);
    }

    if(!confirmPassword){
      setConfirmPasswordError("Please enter to confirm your password");
      setIsValid(false);
    }else if (password !== confirmPassword) {
      setConfirmPasswordError("Password Doesn't Match");  
      setIsValid(false);
    }else{
      setConfirmPasswordError("");
      setIsValid(true);
    }
    setIsButtonClicked(true);
    if(isValid){
      setIsButtonClicked(false);
      createUsers(email, username, password);
      navigation.navigate("Login");
    }
  };
  useEffect(()=>{
    if(isButtonClicked){
      handleSignUp();
    }
  },[username,email,password,confirmPassword]);

  return (
    <View style={styles.centerContainer}>
      <Text style={styles.welcomeTitle}>Sign Up</Text>

      <View style={styles.inputGroup}>
          <Text style={styles.label}>USERNAME:</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your Username"
            value={username}
            onChangeText={setUsername}
            keyboardType="username-address"
          />  
          {usernameError ? <Text style={styles.errorText}>{usernameError}</Text>: null}
      </View>
      <View style={styles.inputGroup}>
          <Text style={styles.label}>EMAIL:</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text>: null}
      </View>
      <View style={styles.inputGroup}>
          <Text style={styles.label}>PASSWORD:</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> :  null}
      </View>
      <View style={styles.inputGroup}>
          <Text style={styles.label}>CONFIRM PASSWORD</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}
      </View>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleSignUp}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? "Signing up..." : "Sign Up"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.registerLink}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.linkText}>Already have an account? Sign in</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;

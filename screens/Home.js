import React from "react";
import { View, Text, TextInput, Image,TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import { styles } from '../styles/styles';
import { useNavigation } from '@react-navigation/native';  
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
    const navigation = useNavigation();

    const handleLogout = async () => {
        console.log("hi")
        await AsyncStorage.clear();

        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    };
    return (
        <View style={styles.homeContainer}>
            <View style={styles.searchBar}>
                <View style={styles.cart}>
                    <AntDesign name="heart" size={34} color="#FF6B6B" />
                </View>
                <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                    <Ionicons name="log-out-outline" size={30} color="black" />
                </TouchableOpacity>
            </View>
            <View>
                <Text style={styles.heading}>Discover Your Vintage</Text>
                <Text style={styles.description}>
                    The year or place in which wine especially wine of high quality, was produced.
                </Text>
            </View>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: 'https://images-na.ssl-images-amazon.com/images/I/71iO5AA8tNL._SS400_.jpg' }}
                    style={styles.image}
                    resizeMode="contain"
                />
            </View>
        </View>
    );
};

export default Home;

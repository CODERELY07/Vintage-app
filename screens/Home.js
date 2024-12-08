import React from "react";
import { View, Text, TextInput, Image } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import { styles } from '../styles/styles';

const Home = () => {
    return (
        <View style={styles.homeContainer}>
            <View style={styles.searchBar}>
                <View style={styles.searchRow}>
                    <AntDesign name="search1" size={24} color="rgba(0,0,0,.5)" />
                    <TextInput placeholder="Search..." style={styles.searchInput} />
                </View>
                <View style={styles.cart}>
                    <AntDesign name="heart" size={34} color="#FF6B6B" />
                </View>
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

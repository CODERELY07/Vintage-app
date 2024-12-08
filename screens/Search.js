import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, Image, ScrollView } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { styles } from '../styles/styles';

const Search = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const openModal = (imageUri) => {
        setSelectedImage(imageUri);
        setModalVisible(true);
    };

    return (
        <View style={styles.homeContainer}>
            <View style={styles.searchBar}>
                <View style={styles.searchRow}>
                    <AntDesign name="search1" size={24} color="rgba(0,0,0,.5)" />
                    <TextInput placeholder="Search..." style={styles.searchInput} />
                </View>
                <View style={styles.cartIcon}>
                    <AntDesign name="heart" size={34} color="#FF6B6B" />
                </View>
            </View>
            <Text style={styles.heading}>Find YOUR VINTAGE</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
                <TouchableOpacity
                    onPress={() => openModal('https://images-na.ssl-images-amazon.com/images/I/81g6i086waL._SS400_.jpg')}
                    style={styles.itemContainer}
                >
                    <Image
                        source={{ uri: 'https://images-na.ssl-images-amazon.com/images/I/81g6i086waL._SS400_.jpg' }}
                        style={styles.itemImage}
                        resizeMode="contain"
                    />
                    <Text style={styles.itemText}>VINTAGE BAG</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => openModal('https://images-cdn.ubuy.com.sa/633fece285b27a39a874e594-vintage-phone-rotary-dial-landline.jpg')}
                    style={styles.itemContainer}
                >
                    <Image
                        source={{ uri: 'https://images-cdn.ubuy.com.sa/633fece285b27a39a874e594-vintage-phone-rotary-dial-landline.jpg' }}
                        style={styles.itemImage}
                        resizeMode="contain"
                    />
                    <Text style={styles.itemText}>VINTAGE TELEPHONE</Text>
                </TouchableOpacity>
            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <Image
                        source={{ uri: selectedImage }}
                        style={styles.modalImage}
                        resizeMode="contain"
                    />
                    <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

export default Search;

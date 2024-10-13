import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, View, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView, Modal } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const userLogin = () => {
    setUsernameError('');
    setPasswordError('');

    const userSavePassword = "mypassword01234";
    const userSaveName = "Emman";

    let isValid = true;

    if (username !== userSaveName) {
      setUsernameError("Please enter correct username");
      isValid = false;
    }

    if (password !== userSavePassword) {
      setPasswordError("Please enter correct password");
      isValid = false;
    }
    
    if (isValid) {
      navigation.navigate("Main");
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
          placeholder="Enter your Password" 
          value={password} 
          onChangeText={setPassword} 
          style={styles.textInput} 
        />
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
      </View>
      <Text style={styles.forgotPasswordText}>FORGOT PASSWORD?</Text>
      <TouchableOpacity style={styles.loginButton} onPress={userLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const HomeScreen = () => {
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
      <View style={{
          width: 65,
          position: 'absolute',
          right: 30,
          height: 65,
          borderRadius: 32,
          backgroundColor: "rgba(0,0,0,0.2)",
          transform: [{ scaleX: 2 }],
          borderColor: "#000",
          borderWidth: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Text style={{color:'#fff'}}>Try Now</Text>
        </View>
        <Image
          source={{ uri: 'https://images-na.ssl-images-amazon.com/images/I/71iO5AA8tNL._SS400_.jpg' }}
          style={styles.image}
          resizeMode="contain"
        />
      </View> 
    </View>
  );
};

const SearchScreen = () => {
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
        <TouchableOpacity onPress={() => openModal('https://images-na.ssl-images-amazon.com/images/I/81g6i086waL._SS400_.jpg')} style={styles.itemContainer}>
          <Image
            source={{ uri: 'https://images-na.ssl-images-amazon.com/images/I/81g6i086waL._SS400_.jpg' }}
            style={styles.itemImage}
            resizeMode="contain"
          />
          <Text style={styles.itemText}>VINTAGE BAG</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openModal('https://images-cdn.ubuy.com.sa/633fece285b27a39a874e594-vintage-phone-rotary-dial-landline.jpg')} style={styles.itemContainer}>
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


const ContactUsScreen = () => {
  return (
    <ScrollView style={styles.contactContainer}>
      <View style={styles.homeContainer}>
        <Text style={styles.welcomeTitle}>Contact Us</Text>
        <Text style={styles.contactInfoText}>
          If you have any questions, feel free to reach out to us!
        </Text>
        <View style={styles.contactRow}>
          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.contactDetail}>+6394567890</Text>
        </View>
        <View style={styles.contactRow}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.contactDetail}>support@vintage.com</Text>
        </View>
        <View style={styles.contactRow}>
          <Text style={styles.label}>Address:</Text>
          <Text style={styles.contactDetail}>334 San St, Buras, Philippines</Text>
        </View>
        <View>
          <Text style={styles.label}>Follow us on social media:</Text>
          <View style={styles.socialIcons}>
            <AntDesign name="facebook-square" size={28} color="black" />
            <AntDesign name="instagram" size={28} color="black" />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const MainScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={24} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="search-outline" size={24} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Contact Us"
        component={ContactUsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="mail-outline" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 90,
    padding: 20,
    width: "70%",
    marginHorizontal: "auto",
  },
  homeContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
    color: "#000",
  },
  label: {
    color: 'rgba(0,0,0,.5)',
  },
  textInput: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#FF6B6B",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  loginButton: {
    backgroundColor: "#FF6B6B",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  forgotPasswordText: {
    textDecorationLine: "underline",
    marginBottom: 20,
    textAlign: "center",
    color: 'rgba(0,0,0,.5)',
  },
  searchBar: {
    height: 140,
    flexDirection: "row",
    marginBottom: -20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.7)',
    borderRadius: 5,
    flex: 1,
    paddingHorizontal: 8,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    padding: 4,
    backgroundColor: "#fff",
  },
  cartIcon: {
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
  },
  contactContainer: {
    backgroundColor: "#fff",
  },
  contactInfoText: {
    marginBottom: 20,
    textAlign: "center",
    color: "#000",
  },
  contactRow: {
    flexDirection: "row",
    marginBottom: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.2)",
  },
  contactDetail: {
    flex: 1,
    lineHeight: 60,
    color: "#000",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 42,
    fontStyle: "italic",
    color: "rgba(0,0,0,.8)",
  },
  subTitle: {
    marginTop: 8,
    width: "70%",
    fontSize: 12,
    color: "rgba(0,0,0,.5)",
  },
  scrollContainer: {
    marginTop: 70,
  },
  itemContainer: {
    marginRight: 10,
  },
  itemImage: {
    width: 200,
    height: 200,
  },
  imageContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  itemText: {
    textAlign: 'center',
    fontWeight: "bold",
    textDecorationLine: 'underline',
    marginTop: 20,
    color: 'rgba(0,0,0,0.7)',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  modalImage: {
    width: '90%',
    height: '90%',
  },
  closeButton: {
    marginTop: -100,
    padding: 10,
    paddingHorizontal:20,
    backgroundColor: "#FF6B6B",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  socialIcons: {
    flexDirection: "row",
    marginTop: 10,
    gap: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  inputGroup: {
    marginBottom: 20,
  },
  image: {
    width: '85%',
    height: '83%',
  },
});

export default App;

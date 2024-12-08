import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { styles } from '../styles/styles';

const ContactUs = () => {
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

export default ContactUs;

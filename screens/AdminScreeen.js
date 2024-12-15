import React, { useState, useEffect } from 'react';
import { Button, Image, View, StyleSheet, FlatList, Text, TextInput, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as SQLite from 'expo-sqlite';

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Initialize the database and create the table if it doesn't exist
  useEffect(() => {
    const initializeDB = async () => {
        const db = await SQLite.openDatabaseAsync('myApp'); 
       
      await db.execAsync(` 
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS images (
          id INTEGER PRIMARY KEY AUTOINCREMENT, 
          path TEXT, 
          title TEXT,
          description TEXT
        );
      `);
      fetchImages(); // Fetch images when the component mounts
    };
    initializeDB();
  }, []);

  // Fetch all images from the SQLite database
  const fetchImages = async () => {
    const db = await SQLite.openDatabaseAsync('myApp'); // Open SQLite database
    const allRows = await db.getAllAsync('SELECT * FROM images');
    setImageList(allRows);
  };

  // Handle picking an image
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Upload the selected image to SQLite
  const uploadImage = async () => {
    if (!title || !description || !image) {
      alert('Please provide a title, description, and pick an image.');
      return;
    }

    const db = await SQLite.openDatabaseAsync('myApp'); // Open SQLite database
    const result = await db.runAsync(
      'INSERT INTO images (path, title, description) VALUES (?, ?, ?)', 
      [image, title, description]
    );
    console.log('Image uploaded, lastInsertRowId:', result.lastInsertRowId);
    
    fetchImages(); // Refresh the image list after uploading
    setTitle(''); // Clear title and description after upload
    setDescription('');
    setImage(null); // Clear image selection
  };

  const deleteImage = async (id) => {
    const db = await SQLite.openDatabaseAsync('myApp'); // Open SQLite database
    await db.runAsync('DELETE FROM images WHERE id = ?',[id]);
    console.log("Delete Successfully!");
    fetchImages();
  }

  // Render each uploaded image with title and description
  const renderItem = ({ item }) => (
    <View style={{ marginBottom: 10 }}>
      <Image source={{ uri: item.path }} style={{ width: 100, height: 100 }} />
      <Text style={{ fontWeight: 'bold', marginTop: 5 }}>{item.title}</Text>
      <Text>{item.description}</Text>
      <TouchableOpacity onPress={() => deleteImage(item.id)}>
        <Text style={{ color: 'red', marginTop: 5 }}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Upload Image" onPress={uploadImage} />
      
      <Text style={{ marginTop: 30, fontSize: 18 }}>Uploaded Images:</Text>
      <FlatList
        data={imageList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    width: '80%',
    paddingHorizontal: 10,
  },
});

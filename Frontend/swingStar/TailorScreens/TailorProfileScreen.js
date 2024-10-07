import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Button } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';

const TailorProfileScreen = () => {
    const navigation = useNavigation();
    const [selectedTab, setSelectedTab] = useState('works');
    const [works, setWorks] = useState([]);
    const [image, setImage] = useState(null);

    // Function to pick image from the gallery
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.uri);
        }
    };

    // Handle image upload to the server
    const handleImageUpload = async () => {
        if (!image) return;
    
        let filename = image.split('/').pop(); // Get the file name
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
    
        const formData = new FormData();
        formData.append('image', {
            uri: image,
            name: filename,
            type: type,
        });
    
        try {
            const response = await axios.post('http://localhost:8070/sewingItem/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setWorks([...works, { imageUrl: response.data.newItem.imageURL }]);
            setImage(null); // Clear the selected image after uploading
        } catch (err) {
            console.error('Failed to upload image', err);
        }
    };
    

    // Function to delete work item
    const deleteWork = async (index, imageUrl) => {
        try {
            await axios.delete('http://localhost:8070/sewingItem/delete', { data: { image: imageUrl } });
            const updatedWorks = works.filter((_, i) => i !== index);
            setWorks(updatedWorks);
        } catch (err) {
            console.error('Failed to delete sewing item', err);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Image source={require('../assets/frock.png')} style={styles.headerImage} />
                </View>
                <View style={styles.profileContainer}>
                    <Image source={require('../assets/frock.png')} style={styles.profileImage} />
                    <Text style={styles.name}>Melissa Peters</Text>
                    <Text style={styles.subtitle}>Young Style</Text>
                    <Text style={styles.location}>Kosgama, Sri Lanka</Text>
                    <Text style={styles.phone}>+9477 5645323</Text>
                    <TouchableOpacity style={styles.orderButton} onPress={() => navigation.navigate('MyOrders')}>
                        <Text style={styles.orderButtonText}>Order</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        style={[styles.tabButton, selectedTab === 'works' && styles.activeTabButton]}
                        onPress={() => setSelectedTab('works')}>
                        <Text style={styles.tabButtonText}>Works</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tabButton, selectedTab === 'reviews' && styles.activeTabButton]}
                        onPress={() => setSelectedTab('reviews')}>
                        <Text style={styles.tabButtonText}>Reviews</Text>
                    </TouchableOpacity>
                </View>

                {selectedTab === 'works' ? (
                    <View style={styles.worksContainer}>
                        {works.map((work, index) => (
                            <View key={index} style={styles.workRow}>
                                <Image source={{ uri: `http://localhost:8070/${work.imageUrl}` }} style={styles.workImage} />
                                <TouchableOpacity onPress={() => deleteWork(index, work.imageUrl)}>
                                    <Ionicons name="trash" size={24} color="red" />
                                </TouchableOpacity>
                            </View>
                        ))}
                        <TouchableOpacity style={styles.addButton} onPress={pickImage}>
                            <Ionicons name="add-circle" size={24} color="#795548" />
                            <Text style={styles.addButtonText}>Add New Work</Text>
                        </TouchableOpacity>
                        {image && (
                            <View style={styles.previewContainer}>
                                <Image source={{ uri: image }} style={styles.previewImage} />
                                <Button title="Upload Image" onPress={handleImageUpload} />
                            </View>
                        )}
                    </View>
                ) : (
                    <View style={styles.reviewsContainer}>
                        <Text style={styles.ratingText}>4.3</Text>
                        <Text style={styles.ratingSubtext}>324 ratings</Text>
                        <View style={styles.starsContainer}>
                            <Text>⭐⭐⭐⭐</Text>
                        </View>
                        <Text style={styles.certificationText}>Certified by XYZ</Text>
                    </View>
                )}
            </ScrollView>

            {/* Navigation Bar */}
            <View style={styles.navBar}>
                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('TailorHome')}>
                    <Ionicons name="home" size={24} color="#000" />
                    <Text style={styles.navText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Msg')}>
                    <Ionicons name="chatbubbles" size={24} color="#000" />
                    <Text style={styles.navText}>Chats</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('MyOrders')}>
                    <Ionicons name="cart" size={24} color="#000" />
                    <Text style={styles.navText}>My Orders</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('SeeappointmentsTailor2')}>
                    <Ionicons name="calendar" size={24} color="#000" />
                    <Text style={styles.navText}>Appointment</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        paddingBottom: 60,
    },
    header: {
        height: 200,
        marginTop: 40,
    },
    headerImage: {
        width: '100%',
        height: '100%',
    },
    profileContainer: {
        alignItems: 'center',
        marginTop: -50,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#fff',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#a5a5a5',
    },
    location: {
        fontSize: 14,
        color: '#a5a5a5',
        marginTop: 5,
    },
    phone: {
        fontSize: 14,
        color: '#a5a5a5',
    },
    orderButton: {
        backgroundColor: '#795548',
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 5,
        marginTop: 20,
    },
    orderButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    tabButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    activeTabButton: {
        borderBottomWidth: 2,
        borderBottomColor: '#795548',
    },
    tabButtonText: {
        fontSize: 16,
        color: '#795548',
    },
    worksContainer: {
        paddingHorizontal: 20,
        marginTop: 20,
    },
    workRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    workImage: {
        width: '80%',
        height: 150,
        borderRadius: 10,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    addButtonText: {
        fontSize: 16,
        color: '#795548',
        marginLeft: 10,
    },
    previewContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    previewImage: {
        width: 150,
        height: 150,
        borderRadius: 10,
    },
    reviewsContainer: {
        paddingHorizontal: 20,
        marginTop: 20,
        alignItems: 'center',
    },
    ratingText: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    ratingSubtext: {
        fontSize: 14,
        color: '#a5a5a5',
    },
    starsContainer: {
        marginTop: 10,
    },
    certificationText: {
        fontSize: 14,
        color: '#333',
        marginTop: 20,
    },
    navBar: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        backgroundColor: '#f8f8f8',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    navItem: {
        alignItems: 'center',
    },
    navText: {
        fontSize: 12,
        color: '#000',
        marginTop: 2,
    },
});

export default TailorProfileScreen;

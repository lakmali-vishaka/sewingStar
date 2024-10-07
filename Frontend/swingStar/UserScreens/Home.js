import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Home = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [tailors, setTailors] = useState([]);

  // Fetch all tailors when component mounts
  useEffect(() => {
    const fetchTailors = async () => {
      try {
        const response = await fetch('http://localhost:8070/tailor/fetch'); // Use IP address or emulator address
        const data = await response.json();
        setTailors(data);  // Store tailors in state
      } catch (error) {
        console.error('Error fetching tailors:', error);
      }
    };

    fetchTailors();
  }, []);

  // Render each user/tailor in the FlatList
  const renderUser = ({ item }) => (
    <View style={styles.box}>
      <Text style={styles.name}>{item.First_Name} {item.Last_Name}</Text>
      <Text style={styles.shop}>{item.Shop_Name}</Text>
      <Text style={styles.city}>{item.city}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Search bar */}
      <View style={styles.searchProfileRow}>
        <View style={styles.searchBarContainer}>
          <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchBar}
            placeholder="Search for a tailor"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Display grid of tailors */}
<FlatList
  data={tailors.filter(tailor =>
    `${tailor.First_Name} ${tailor.Last_Name} ${tailor.city}`.toLowerCase().includes(searchQuery.toLowerCase())
  )}
  renderItem={renderUser}
  keyExtractor={item => item._id}  // Ensure _id is used as key
  numColumns={3}  // Display in 3 columns for grid
  contentContainerStyle={styles.grid}
/>


      {/* Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Orders')}>
          <Ionicons name="cart" size={24} color="#777" />
          <Text style={styles.navText}>Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Chats')}>
          <Ionicons name="chatbubbles" size={24} color="#777" />
          <Text style={styles.navText}>Chats</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('HelpDesk')}>
          <Ionicons name="help" size={24} color="#777" />
          <Text style={styles.navText}>HelpDesk</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Appointment')}>
          <Ionicons name="calendar" size={24} color="#777" />
          <Text style={styles.navText}>Appointment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 60,  // Space for navbar
  },
  searchProfileRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 80,
  },
  searchBarContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#bcaaa4',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    marginLeft: 10,
  },
  searchIcon: {
    marginLeft: 10,
  },
  searchBar: {
    flex: 1,
    padding: 10,
    backgroundColor: '#bcaaa4',
    paddingLeft: 10,
    marginLeft: 10,
  },
  grid: {
    justifyContent: 'space-between',
  },
  box: {
    flex: 1,
    margin: 10,
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  shop: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  city: {
    fontSize: 14,
    color: '#888',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#F8F8F8',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    marginTop: 4,
    fontSize: 12,
    color: '#777',
  },
});

export default Home;

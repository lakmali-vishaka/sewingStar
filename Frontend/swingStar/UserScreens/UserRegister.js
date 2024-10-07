import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

export default function RegisterScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setemail] = useState("");
  const [NIC, setNIC] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  
  const navigation = useNavigation();

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  
    
    const handleSubmit = async () => {
      // Check if passwords match
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      
     
      setError('');
      setMessage('');
    
      const userInfo = {
        First_Name: firstName,  
        Last_Name: lastName,
        email: email,
        NIC: NIC,
        password: password,
        Confirm_Password: confirmPassword,
        
      };
    
      try {
        const response = await axios.post('http://localhost:8070/user/Uadd', userInfo);
        setMessage('Signup successful! Redirecting to Login...');
        
        // Console log after successful registration
        console.log('User registered successfully:', userInfo);
        
        
        setTimeout(() => {
          navigation.navigate('Ulogin'); 
        }, 1500);  
    
      } catch (error) {
        console.log(error.response);  // Log the error response
        if (error.response && error.response.data && error.response.data.error === 'User already exists') {
          setMessage('User already exists');
        } else {
          setMessage('Error signing up. Please try again.');
        }
      }
    
    };
    
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('../assets/Back.png')}
        style={styles.headerImage}
        resizeMode="cover"
      />

      <Text style={styles.title}>Register Account</Text>

      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />

      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />

      <TextInput
        style={styles.input}
        placeholder="enter your Email"
        keyboardType="Email"
        value={email}
        onChangeText={setemail}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter your NIC"
        value={NIC}
        onChangeText={setNIC}
      />

        

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={!passwordVisible}
          value={password}
          onChangeText={setPassword}
        />
        <Ionicons
          name={passwordVisible ? "eye-off" : "eye"}
          size={24}
          color="black"
          onPress={() => setPasswordVisible(!passwordVisible)}
        />
      </View>

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Confirm Password"
          secureTextEntry={!passwordVisible}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <Ionicons
          name={passwordVisible ? "eye-off" : "eye"}
          size={24}
          color="black"
          onPress={() => setPasswordVisible(!passwordVisible)}
        />
       
      </View>
     

      {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
      {message ? <Text style={styles.successMessage}>{message}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Ionicons name="logo-google" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Ionicons name="logo-facebook" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Text
        style={styles.footerText}
        onPress={() => navigation.navigate("Login")}
      >
        Already have an account? <Text style={styles.loginText}>Log In</Text>
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  headerImage: {
    width: "112%",
    height: Dimensions.get("window").height * 0.25,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
  },
  passwordContainer: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#6C4A2F",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  socialButton: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
  },
  footerText: {
    fontSize: 14,
  },
  loginText: {
    color: "#FFA500",
    fontWeight: "bold",
  },
  errorMessage: {
    color: "red",
    fontSize: 16,
    marginBottom: 20,
  },
  successMessage: {
    color: "green",
    fontSize: 16,
    marginBottom: 20,
  },

});

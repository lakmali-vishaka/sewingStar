import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const [NIC, setNIC] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (!NIC || !password) {
      setMessage("Both NIC and password are required.");
      return;
    }
  
    try {
      const result = await axios.post("http://localhost:8070/tailor/login", { NIC, password });
  
      // Adjust the success condition based on your API response
      if (result.data.token) { // Check if a token is returned
        setMessage("Login successful!");
        navigation.navigate("TailorHome"); // Navigate to the Home screen
      } else {
        setMessage("Invalid NIC or password.");
      }
    } catch (err) {
      setMessage(""); 
  
      if (err.response) {
        if (err.response.status === 400) {
          setMessage("Bad Request: Please ensure NIC and password are correct.");
        } else if (err.response.status === 401) {
          setMessage("Unauthorized: Your NIC or password is incorrect.");
        } else if (err.response.status === 500) {
          setMessage("Server error: Please try again later.");
        } else {
          setMessage("An error occurred. Please try again.");
        }
      } else if (err.request) {
        // No response received from server
        setMessage("Network error: Unable to connect to the server.");
      } else {
        // Any other errors during request setup
        setMessage("An error occurred: " + err.message);
      }
    }
  };
  
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://your-image-url.com" }} // Replace with your image URL
        style={styles.logo}
      />
      <Text style={styles.title}>Login Account</Text>
      <Text style={styles.subtitle}>
        Hello, you must login first to be able to use the application and enjoy all the features in SawingStar.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="NIC"
        value={NIC}
        onChangeText={setNIC}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {message ? <Text style={styles.message}>{message}</Text> : null}
      <TouchableOpacity style={styles.signInButton} onPress={handleSubmit}>
        <Text style={styles.signInButtonText}>Sign In</Text>
      </TouchableOpacity>
      <Text style={styles.orText}>Or Sign In With</Text>
      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Icon name="google" size={30} color="#DB4437" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Icon name="facebook" size={30} color="#4267B2" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.signupLink}
        onPress={() => navigation.navigate("Reg")}
      >
        <Text style={styles.linkText}>Don't have an account? Join Us</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F3F3F3",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
    color: "#666",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  message: {
    color: "red",
    marginBottom: 12,
    textAlign: "center",
  },
  signInButton: {
    backgroundColor: "#6B4226",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 4,
    marginBottom: 20,
  },
  signInButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  orText: {
    fontSize: 14,
    marginVertical: 20,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
    marginBottom: 20,
  },
  socialButton: {
    padding: 10,
    borderRadius: 5,
  },
  signupLink: {
    marginTop: 20,
  },
  linkText: {
    color: "#6B4226",
    textDecorationLine: "underline",
  },
});

export default LoginScreen;

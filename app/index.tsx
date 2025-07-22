import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../context/AuthContext";

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const router = useRouter();
  const { signIn } = useAuth();

  const handleSignUp = () => {
    router.push("/signup");
  };

  const handleSignIn = async () => {
    let valid = true;
    setUsernameError("");
    setPasswordError("");
    setSuccessMessage("");
    setEmailError("");

    // Email validation
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (email.length < 1) {
      setEmailError("Email address is required");
      valid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
      valid = false;
    }

    // Password validation with Regex
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be at least 8 characters long and include at least one uppercase letter, one number, and one special character."
      );
      valid = false;
    }

    try {
      if (valid) {
        console.log("Valid sign in");
        await signIn(email, password);
      }
    } catch (error) {
      console.log(error);
      alert(
        `Sign-in failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.header}>Sign In</Text>

        <View style={styles.inputContainer}>
          {emailError ? (
            <Text style={styles.errorMessage}>{emailError}</Text>
          ) : null}
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#a0a0a0"
          />
        </View>

        <View style={styles.inputContainer}>
          {passwordError ? (
            <Text style={styles.errorMessage}>{passwordError}</Text>
          ) : null}
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#a0a0a0"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signUpLink} onPress={handleSignUp}>
          <Text style={styles.signUpLinkText}>Sign Up</Text>
        </TouchableOpacity>

        {successMessage ? (
          <Text style={styles.successText}>{successMessage}</Text>
        ) : null}

        <StatusBar />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f8ff",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    width: SCREEN_WIDTH,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 32,
    marginBottom: 30,
    fontWeight: "bold",
    color: "#333",
    alignSelf: "center",
  },
  inputContainer: {
    width: SCREEN_WIDTH - 40,
    marginBottom: 15,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#a0a0a0",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: "white",
    fontSize: 16,
  },
  errorMessage: {
    color: "#dc3545",
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    width: SCREEN_WIDTH - 40,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#007bff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  signUpLink: {
    marginTop: 15,
    padding: 10,
  },
  signUpLinkText: {
    color: "#007bff",
    fontSize: 14,
    alignSelf: "center",
  },
  successText: {
    color: "green",
    marginTop: 10,
    alignSelf: "center",
  },
});

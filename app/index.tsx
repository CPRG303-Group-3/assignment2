import { StatusBar } from "expo-status-bar";
import React, { use, useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import credentials from "../credentials.json";
import { useRouter } from "expo-router";

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const router = useRouter();

  const handleSignIn = () => {
    let valid = true;
    let validated = false;
    let validatedPass = false;
    setUsernameError("");
    setPasswordError("");
    setSuccessMessage("");

    // Username validation
    if (username.length < 5) {
      setUsernameError("Username must be at least 5 characters long.");
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

    if (valid) {
      for (const value of credentials.users) {
        if (username == value.username) {
          setUsernameError("");
          validated = true;
          console.log(value.username);
          break;
        }
        setUsernameError("Username not found");

        // setSuccessMessage("Enter a valid username");
        // console.log(value.username);
      }
    }

    if (valid && validated) {
      for (const value of credentials.users) {
        if (password == value.password) {
          setPasswordError("");
          validatedPass = true;
          console.log(value.password);
          break;
        }
        setPasswordError("Incorrect password entered.");
      }
    }

    if (valid && validated && validatedPass) {
      setSuccessMessage("Sign-in succesful");
      router.push("/(tabs)");
    }

    // Chioma and Harsimar please add the logic to check against credentials.json here!
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      {usernameError ? (
        <Text style={styles.errorText}>{usernameError}</Text>
      ) : null}

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {passwordError ? (
        <Text style={styles.errorText}>{passwordError}</Text>
      ) : null}

      <Button title="Sign In" onPress={handleSignIn} />

      {successMessage ? (
        <Text style={styles.successText}>{successMessage}</Text>
      ) : null}

      <StatusBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  successText: {
    color: "green",
    marginTop: 10,
  },
});

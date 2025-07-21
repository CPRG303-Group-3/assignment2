import { StatusBar } from "expo-status-bar";
import React, { use, useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import credentials from "../credentials.json";
import { useRouter } from "expo-router";
import { signInWithEmail } from "../utils/supabaseAuth";

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const router = useRouter();

  const handleSignUp = () => {
    router.push("/signup");
  };

  const handleSignIn = async () => {
    let valid = true;
    // let validated = false;
    // let validatedPass = false;
    setUsernameError("");
    setPasswordError("");
    setSuccessMessage("");
    setEmailError("");

    // // Username validation
    // if (username.length < 5) {
    //   setUsernameError("Username must be at least 5 characters long.");
    //   valid = false;
    // }

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
        await signInWithEmail(email, password).then(() =>
          router.push("./(tabs)/landing")
        );
        alert("Sign-In succesful");
      }
    } catch (error) {
      console.log(error);
    }
    // try {
    //         if (valid) {
    //             await signIn(email, password).then(() => router.push("./(tabs)/profile"));
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         if (error.message === "Invalid login credentials") {
    //             setLoginError("Invalid email and password combination");
    //         }
    //     }

    // if (valid) {
    //   for (const value of credentials.users) {
    //     if (username == value.username) {
    //       setUsernameError("");
    //       validated = true;
    //       console.log(value.username);
    //       break;
    //     }
    //     setUsernameError("Username not found");

    //     // setSuccessMessage("Enter a valid username");
    //     // console.log(value.username);
    //   }
    // }

    // if (valid && validated) {
    //   for (const value of credentials.users) {
    //     if (password == value.password) {
    //       setPasswordError("");
    //       validatedPass = true;
    //       console.log(value.password);
    //       break;
    //     }
    //     setPasswordError("Incorrect password entered.");
    //   }
    // }

    // if (valid) {
    //   setSuccessMessage("Sign-in succesful");
    //   router.push("/(tabs)");
    // }

    // Chioma and Harsimar please add the logic to check against credentials.json here!
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Assignment 2 - Tabs and Forms</Text>
      <Text style={styles.title}>Sign In</Text>

      {/* <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      {usernameError ? (
        <Text style={styles.errorText}>{usernameError}</Text>
      ) : null} */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

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

      <Button title="Sign Up" onPress={handleSignUp} />

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
    backgroundColor: "#f0f8ff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 80,
    color: "#007bff",
    textAlign: "center",
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

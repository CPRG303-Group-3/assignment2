import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { signUpWithEmail } from "../utils/supabaseAuth";

export default function SignUp() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const goBack = () => {
    router.push("/");
  };

  const handleSignUp = async () => {
    let validated = true;

    setFirstNameError("");
    if (firstName.length < 1) {
      setFirstNameError("Please enter a First Name");
      validated = false;
    }

    setLastNameError("");
    if (lastName.length < 1) {
      setLastNameError("Please enter a Last Name");
      validated = false;
    }

    setEmailError("");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.length < 1 || !emailRegex.test(email)) {
      setEmailError("Please enter a valid email");
      validated = false;
    }

    setPasswordError("");
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be at least 8 characters long and include at least one uppercase letter, one number, and one special character."
      );
      validated = false;
    }

    if (validated) {
      try {
        await signUpWithEmail(email, password, firstName, lastName);
        alert("Sign Up Successful");
      } catch (error: any) {
        console.log("Error: ", error);

        if (error.message == "User already registered") {
          alert("Sign up unsuccesful\n User already exists with that email");
        } else {
          alert("Sign up unsuccesful");
        }
      }
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <Text style={styles.header}>Sign Up</Text>

      {firstNameError ? (
        <Text style={styles.errorMessage}>{firstNameError}</Text>
      ) : null}
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />

      {lastNameError ? (
        <Text style={styles.errorMessage}>{lastNameError}</Text>
      ) : null}
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />

      {emailError ? (
        <Text style={styles.errorMessage}>{emailError}</Text>
      ) : null}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      {passwordError ? (
        <Text style={styles.errorMessage}>{passwordError}</Text>
      ) : null}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Pressable style={styles.button} onPress={handleSignUp}>
        <Text style={{ color: "white" }}>Create Account</Text>
      </Pressable>

      <Pressable onPress={goBack}>
        <Text>Back to Sign In?</Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f8ff",
  },
  header: {
    fontSize: 30,
    marginBottom: 30,
    fontWeight: "bold",
  },
  errorMessage: {
    color: "red",
    width: "80%",
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    marginTop: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
});

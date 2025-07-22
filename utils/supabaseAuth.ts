import { supabase } from "../lib/supabase";

// 🔐 SIGN-UP FUNCTION
export async function signUpWithEmail(
  email: string,
  password: string,
  firstName: string,
  lastName: string
) {
  // Convert email to lowercase for consistent storage
  const lowercaseEmail = email.toLowerCase();

  const { data, error } = await supabase.auth.signUp({
    email: lowercaseEmail,
    password,
  });

  if (error) {
    console.log("Error occurred: ", error);
    throw error;
  }

  const user = data.user;

  if (user) {
    const { error: insertError } = await supabase.from("user_details").insert([
      {
        UUID: user.id, //- actually gets generated automatically from the auth table
        "First Name": firstName,
        "Last Name": lastName,
        Email: lowercaseEmail,
      },
    ]);

    if (insertError) {
      console.log("Insert error occurred: ", insertError);
      throw insertError;
    }
  }

  return data;
}

// 🔐 SIGN-IN FUNCTION
export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.toLowerCase(),
    password,
  });

  if (error) throw error;
  return data;
}

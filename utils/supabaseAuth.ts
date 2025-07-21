import { supabase } from "../lib/supabase";

// 🔐 SIGN-UP FUNCTION
export async function signUpWithEmail(
  email: string,
  password: string,
  firstName: string,
  lastName: string
) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  console.log(error);
  console.log(data.user);
  if (error) throw error;

  const user = data.user;

  if (user) {
    const { error: insertError } = await supabase.from("user_details").insert([
      {
        UUID: user.id,
        "First Name": firstName,
        "Last Name": lastName,
        Email: email,
      },
    ]);

    if (insertError) throw insertError;
  }

  return data;
}

// 🔐 SIGN-IN FUNCTION
export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

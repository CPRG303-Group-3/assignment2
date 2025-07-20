import { supabase } from '../lib/supabase'

// 🔐 SIGN-UP FUNCTION
export async function signUpWithEmail({ email, password, firstName, lastName }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) throw error

  const user = data.user

  if (user) {
    const { error: insertError } = await supabase
      .from('user_details')
      .insert([
        {
          UUID: user.id,
          "First Name": firstName,
          "Last Name": lastName,
          Email: email,
        },
      ])

    if (insertError) throw insertError
  }

  return data
}

// 🔐 SIGN-IN FUNCTION
export async function signInWithEmail({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
  return data
}

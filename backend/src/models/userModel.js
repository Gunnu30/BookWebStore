// src/models/userModel.js
const supabase = require("../config/db");

exports.findByEmailOrUserName = async (username, email) => {
    const {data,error }= await supabase
    .from('users')
    .select('*')
    .or(`username.eq.${username},email.eq.${email}`)
    .maybeSingle();
    if(error){
      throw error;
    }
    console.log("obj",data)
    return data;
};

// Change 'password' to 'password_hash' in the INSERT query
exports.createUser = async (username, email, password, role) => {
  console.log(username,email,password,role)
  const {data,error} = await supabase
  .from("users")
  .insert([{username:username,email:email,password_hash:password,role:role}])  
  .select()
  .single();
  if(error)throw error;
  console.log(data,"hii")
  return data;
};

// Ensure this query selects the right columns
exports.findUserByEmail = async (email) => {
  console.log(email)
    const {data,error} = await supabase
    .from("users")
    .select("*")
    .eq('email',email);
    if(error)throw error;
    console.log(data,"data");
  return data[0];
};
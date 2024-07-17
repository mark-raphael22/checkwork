import  User from "../Model/UserModel.js";
import bcrypt from "bcryptjs"

export const formatUserService = async (data) => {
  const {
    phone_number,
    last_name,
    first_name,
    email,
    _id,
    _v,
    is_admin,
    clubs,
    posts,
    ...others
  } = data;

  return {
    id: _id,
    profile: {
      phone_number: phone_number ? phone_number : null,
      first_name: first_name ? first_name : null,
      last_name: last_name ? last_name : null,
      email: email ? email : null,
      is_admin: is_admin,
    },
    clubs: clubs
      ? {
          clubs: clubs ? clubs.name : null,
          description: clubs.description ? clubs.description : null,
          image: clubs.image? clubs.image : null,
        }
      : [],
      posts: posts
      ? {
          body: posts.body ? posts.body : null,
          likes: posts?.likes?.length ? posts?.likes?.length : [],
        }
      : [],
  };
};

export const findUserByService = async (data) => {
  try {
    let user = await User.findById(data);
    if (!user) return res.status(400, ).json({message:"User account not Found",...user.toObject(), _id: user.id})
    if (user) return formatUserService(user);
// after gtting the id whereby being a single user you then format a user profile  down to evry last detail .    if (user) return formatUserService(user);
  } catch (error) {
    return false;
  }
}


export const saveUserService = async (data, res) => {
  try {
    let { email, password, first_name, last_name, phone_number } = data;
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error(`User already exists with email ${email}`);
    }
    //make sure you install the phone dependency then fit in the user password 
    phone_number = phone(phone_number, { country: "NG" }).phoneNumber;
    let encrypted = await bcrypt.hash(password, 10);``
    data.pass_hash = encrypted;
    data.phone_number = phone_number;

    /** 
     * @type {Document<{}>}
     */
    let user = await new User(data);
    user = await user.save();
    return user;
  } catch (error) {
    console.log({ error });
    throw error;
  }
};


export const getUserByIdentifierService = async (identifier) => {
  try {
    let user = await User.findOne({
      $or: [{ phone_number: identifier }, { email: identifier }],
    });
    if (!user) throw new Error("Email or phone number does not exist");
    return { ...user.toObject(), _id: user.id };
  } catch (error) {
    throw error;
  }
};


export const joinClubService = async (req,res) => {
  const clubID=req.params.clubID;
  try {
    
    let user = User.findByIdAndUpdate(
      req.user,
      {
        $push: {
          clubs: clubID,
        },
      },
      { new: true }
    );
    await Club.findByIdAndUpdate(
      clubID,
      {
        $pull: {
          members: req.user,
        },
      },
      { new: true }
    );
    return user;
  } catch (error) {
    return false;
  }
};


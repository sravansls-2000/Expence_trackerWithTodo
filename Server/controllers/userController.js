import User from '../models/user.js';

const registerUser = async (req, res) => {
  const { email, firstName, lastName, mobileNumber, passWord } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) throw new Error('User already exists');
  try {
    const newUser = await new User({
      email,
      firstName,
      lastName,
      mobileNumber,
      passWord,
    });
    await newUser.save();
    return res.status(200).json(newUser);
  } catch (error) {
    res.json(error);
  }
};
const fetchUsersCtrl = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.json(error);
  }
};

//login user
const loginUserCtrl = async (req, res) => {
  const { email, passWord } = req?.body;

  const userFound = await User.findOne({ email });

  if (userFound && (await userFound?.passWord) === passWord) {
    res.json({
      _id: userFound?._id,
      firstname: userFound?.firstName,
      lastname: userFound?.lastName,
      mobileNumber: userFound?.mobileNumber,
      email: userFound?.email,
      isAdmin: userFound?.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error('Invalid Login credentials');
  }
};

export { registerUser, fetchUsersCtrl, loginUserCtrl };

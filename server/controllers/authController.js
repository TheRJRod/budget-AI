import User from '../models/User.js'

const user = await User.findOne({email});
if(user && await user.matchPassword(password)) {
    
}
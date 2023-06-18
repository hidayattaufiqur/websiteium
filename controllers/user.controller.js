const { userSchema } = require('./../models');
const { jwtService } = require('./../services')
const { HttpStatus } = require('../constants');

const User = userSchema;

exports.getMeHandler = async (req, res) => {
    const { user } = req;

    user.createdAt = undefined;
    user.__v = undefined;

    return res.status(200).json({
        statusCode: 200, 
        msg: 'User details fetched successfully',
        data: user,
    });
};

exports.signUpHandler = async (req, res) => {
    const { 
        fullName, email, password } = req.body;

    const _email = await User.findOne({ email }); 

    if (_email){
        return res 
            .status(HttpStatus.BAD_REQUEST)
            .json({ statusCode: HttpStatus.BAD_REQUEST, msg: 'Email is already taken'});
    };

    if (password < 8) { 
        return res 
            .status(HttpStatus.BAD_REQUEST)
            .json({ statusCode: HttpStatus.BAD_REQUEST, msg: 'Minimum length of password is 8'})
    ;}

    const user = await User.create({ 
        fullName, email, password
    });

    return res
        .status(HttpStatus.CREATED) 
        .json({ statusCode: HttpStatus.CREATED, msg: 'Signup succedeed' });
};

exports.loginHandler = async (req, res) => {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
        return res
        .status(HttpStatus.UNAUTHORIZED)
        .redirect('/login');
    }
    
    if (!(await user.matchPassword(password))) {
        return res
        .status(HttpStatus.UNAUTHORIZED)
        .redirect('/login');
    }
    
    const token = jwtService.signToken(user._id); 

    res.setHeader('token', token);
    res.cookie('token', token, jwtService.getCookieOptions(req));

    return res
        .redirect('/dashboard');
};

exports.logoutHandler = (_, res) => {
    res.clearCookie("token");
    
    return res
        .status(HttpStatus.OK)
        .redirect('/');
};


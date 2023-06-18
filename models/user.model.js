const { Schema, model } = require('mongoose'); 
const { bcryptService } = require('./../services')

const userSchema = new Schema(
    {
        fullName: {
            type: String, 
            required: [true, 'Name is Required'], 
        }, 
        email: {
            type: String, 
            required: [true, 'Email is Required'], 
            unique: true, 
            lowercase: true,
        }, 
        password: {
            type: String,
            required: [true, 'Password is Required'],
            minlength: 8,
            select: false, 
        },
        passwordChangedAt: Date,
        resetPasswordToken: String,
        resetPasswordExpire: Date, 
    }, 
    { timestamps: true },
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); 
    this.password = await bcryptService.hashPassword(this.password);
    return next();
});

userSchema.methods.matchPassword = async function (password) {
    const isMatch = await bcryptService.comparePassword(
        password, 
        this.password,
    );
    return isMatch;
}; 

userSchema.methods.getResetPasswordToken = function () {
    const { resetPasswordExpire, resetPasswordToken } = bcryptService.getResetPasswordToken();
  
    this.resetPasswordToken = resetPasswordToken;
    this.resetPasswordExpire = resetPasswordExpire;
    return {
        resetPasswordToken, 
        resetPasswordExpire,
    };
};

module.exports = model('User', userSchema);

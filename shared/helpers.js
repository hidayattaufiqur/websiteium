const toNumber = (n) => Number.parseInt(n, 10);

const regexConstants = {
    email: '/^w+([.-]?w+)*  w+([.-]?w+)*(.w{2,3})+$/',
};
  
const getExpirationTime = () => {
    const date = new Date();
    return date.setDate(date.getDate() + toNumber(process.env.COOKIE_EXPIRE));
};

const emailMessage = (name, resetUrl) => { 
    let body = `<p>Hello ${name}, </p> 
    <br> 
    <p> here's the link to reset your password: </p> 
    <a href="${resetUrl}">${resetUrl}</a>
    <p>this link will expire in 30 minutes.</p> 
    <br><br>
    <p>have a good one, Proclub.</p>`

    return body; 
};

module.exports = {
    toNumber,
    regexConstants, 
    getExpirationTime,
    emailMessage
}
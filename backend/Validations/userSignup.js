

exports.validateUserSignup = (signupdata) => {
    if (!signupdata) {
        return false;
    }
    if (!signupdata.email) {
        return false;
    }
    if (!signupdata.password) {
        return false;
    }
}
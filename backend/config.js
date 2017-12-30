module.exports = {
    'facebookAuth' : {
        'clientID'      : '542387059471156',
        'clientSecret'  : 'c8b6a5869924fc1d3b76ec48ed85f7ea',
        'callbackURL'     : 'http://localhost:4000/api/auth/facebook/callback',
        'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email'

    },

    'googleAuth' : {
        'clientID'         : "772441765876-m7btt6vre88q5o057bcjq0rubud3qnaf.apps.googleusercontent.com",
        'clientSecret'     : "C0C_4ijCD1e8BPk4CRRn5pKW",
        'callbackURL'      : 'http://localhost:4000/auth/google/callback'
    }
};

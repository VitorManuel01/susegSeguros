const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user'); // Adjust path as needed

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'senha'
}, async (email, senha, done) => {
    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            console.log("Email não encontrado:", email);
            return done(null, false, { message: 'Email não encontrado.' });
        }

        console.log('Plaintext senha:', senha);
        console.log('Hashed senha from database:', user.senha);

        const isMatch = await bcrypt.compare(senha, user.senha);

        if (isMatch) {
            return done(null, user);
        } else {
            console.log("Senha incorreta para o usuário:", user.email);
            return done(null, false, { message: 'Senha incorreta.' });
        }
    } catch (error) {
        console.error('Erro ao autenticar usuário:', error);
        return done(error);
    }
}));



passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findByPk(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

module.exports = passport;

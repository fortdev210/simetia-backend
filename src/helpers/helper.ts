import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
const secret_key = process.env.SECRET as string;

class Helper {

    public hashPassword = (password:string) => {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
    }

    public comparePassword = (hashPassword:string, password:string) => {
        return bcrypt.compareSync(password, hashPassword)
    }

    public isValidEmail = (email:string) => {
        return /\S+@\S+\.\S+/.test(email)
    }

    public generateToken = (id:string) => {
        const token = jwt.sign({
            userId: id
          }, 
          secret_key, 
          { expiresIn: '7d' });
        return token;
    }
    
}

export default Helper;
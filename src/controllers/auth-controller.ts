import { RequestHandler } from "express";
import { verifyToken } from "../utils/jwt";
import { registerSchema, loginSchema, resetTokenSchema, resetPasswordSchema } from "../validations/auth-validation";
import { registerUser, loginUser, genResetToken, resetPassword } from "../services/auth-service";

export const handleRegister: RequestHandler = async (req, res) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }

    const { email, password, role } = req.body;
    const user = await registerUser(email, password, role);

    res.status(201).json({ message: "user registered", user });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

export const handleLogin: RequestHandler = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }

    const { email, password } = req.body;
    const result = await loginUser(email, password);

    res.cookie('token', result.token, {
      maxAge: 24 * 60 * 60 * 1000, // 1d
    });

    (req as any).session.user = {id: result.id};

    res.json({ message: "login success", ...result });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

export const handleGenResetToken: RequestHandler = async (req, res) => {
  try {
    const { error } = resetTokenSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }


    const token = await genResetToken(req.body.email);

    res.send(`${req.host}/auth/resetPassword/${token}`)
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

export const handleResetPassword: RequestHandler = async (req, res) => {
  try {
    const { error } = resetPasswordSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }

    const parsedToken = verifyToken(req.params.token);
    const password = req.body.password;

    const result = await resetPassword((parsedToken as any).id, password)

    res.send('password updated');
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}
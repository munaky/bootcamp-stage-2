import bcrypt from 'bcrypt';
import { prisma } from '../prisma/client';
import { signToken } from '../utils/jwt';

export const registerUser = async (email: string, password: string, profile: string, role: string) => {
    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: { email, password: hashed, profile, role}
    });

    return user;
}

export const loginUser = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) throw new Error('no user found');

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new Error('password not match');

    const token = signToken({ id: user.id, role: user.role });

    return { token };
}

export const genResetToken = async (email: string) => {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) throw new Error('no user found');

    const token = signToken({ id: user.id });

    return token;
}

export const resetPassword = async (id: number, password: string) => {
    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.update({ 
        where: { id },
        data: {
            password: hashed
        }
    });

    if (!user) throw new Error('no user found');
}
import { RequestHandler } from "express";
import { verifyToken } from "../utils/jwt";
import { resJson } from "../utils/response-format";
import { profileSchema } from "../validations/upload-validation";
import { prisma } from '../prisma/client'

export const uploadProfile: RequestHandler = async (req, res) => {
    try {
        console.log((req as any).user)
        const { error } = profileSchema.validate({ profile: req.file });
        if (error) {
            resJson(res, 400, 'error', error.message);
            return;
        }

        const user = await prisma.user.update({
            where: {id: (req as any).user.id},
            data: {profile: req.file?.filename ?? 'default.png'}
        });

        resJson(res, 200, 'success', 'profile image updated', user);
    } catch (error: any) {
        resJson(res, 500, 'error', error.message)
    }
}
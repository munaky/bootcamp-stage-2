import { Response } from "express"

export const resJson = (res: Response,code: number, status: string, message: string = '', data: any = null): void => {
    res.status(code).json({
        code,
        status,
        message,
        data
    });
}

export const resSuccess = (res: Response,code: number, message: string = '', data: any = null): void => {
    res.status(code).json({
        code,
        status: 'success',
        message,
        data
    });
}

export const resError = (res: Response,code: number, message: string = '', data: any = null): void => {
    res.status(code).json({
        code,
        status: 'error',
        message,
        data
    });
}
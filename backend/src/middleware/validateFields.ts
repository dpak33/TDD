import { Request, Response, NextFunction } from 'express';

const validateFields = (requiredFields: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ message: `${field.charAt(0).toUpperCase() + field.slice(1)} is required` });
            }
        }
        next();
    };
};

export default validateFields;
import { z } from 'zod';
import bcryptjs from 'bcryptjs';

import { registerSchema } from '@/schemas';
import { db } from '@/lib/db';

export const register = async (values: z.infer<typeof registerSchema>) => {
    const validatedFields = registerSchema.safeParse(values);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { username, email, password } = validatedFields.data;

    const isDuplucatedUser = await db.user.findUnique({
        where: {
            email,
        },
    });

    if (!!isDuplucatedUser) {
        return {
            message: 'Tài khoản email đã tồn tại',
        };
    }

    const hashPassword = await bcryptjs.hash(password, 10);

    await db.user.create({
        data: {
            email,
            username,
            password: hashPassword,
        },
    });

    return {
        message: 'Tạo tài khoản thành công',
    };
};

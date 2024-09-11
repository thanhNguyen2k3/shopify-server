'use client';

import Image from 'next/image';

import FormControl from '@/components/form-control/form-control';
import styles from './login.module.scss';
import Button from '@/components/button/button';

const LoginPage = () => {
    return (
        <div className={styles.layout}>
            <div className={styles.wrapper}>
                <h1 className={styles.heading}>Đăng nhập</h1>
                <form className={styles.form}>
                    <FormControl name="email" type="email" placeholder="example@gmail.com" label="Địa chỉ email" />
                    <FormControl name="password" type="password" placeholder="..." label="Mật khẩu" />
                    <Button type="submit" variant="primary" activeType="button" sx={{ width: '100%' }}>
                        Đăng nhập
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;

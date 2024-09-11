import { HTMLAttributes, useEffect, useState } from 'react';
import styles from './toast-message.module.scss';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { MdErrorOutline } from 'react-icons/md';

type Props = HTMLAttributes<HTMLDivElement> & {
    isStatus?: 'success' | 'error';
    message?: string;
};

const ToastMessage = ({ isStatus, message, ...props }: Props) => {
    const [time, setTime] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => {
            setTime(false);
        }, 3000);
    }, []);

    return (
        <div
            {...props}
            style={{ transform: !time ? 'translateY(-130px)' : 'translateY(0)' }}
            className={styles.wrapper}
        >
            {isStatus === 'error' && (
                <div className={`${styles.toast} ${styles.error}`}>
                    <div className={styles.icon}>
                        <MdErrorOutline size={20} />
                    </div>
                    <div className={styles.title}>{message}</div>
                </div>
            )}

            {isStatus === 'success' && (
                <div className={`${styles.toast} ${styles.success}`}>
                    <div className={styles.icon}>
                        <FaRegCircleCheck size={20} />
                    </div>
                    <div className={styles.title}>{message}</div>
                </div>
            )}
        </div>
    );
};

export default ToastMessage;

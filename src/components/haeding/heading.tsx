import { ReactNode } from 'react';
import styles from './heading.module.scss';

type Props = {
    title: string;
    button?: ReactNode;
    status?: string;
    titleStatus?: string;
};

const Heading = ({ title, button, status, titleStatus }: Props) => {
    return (
        <h1 className={styles.heading}>
            {button && button}
            {title}
            {status === 'active' && <span className={styles.active}>{titleStatus}</span>}
            {status === 'inActive' && <span className={styles.in_active}>{titleStatus}</span>}
        </h1>
    );
};

export default Heading;

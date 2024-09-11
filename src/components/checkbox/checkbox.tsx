import styles from './checkbox.module.scss';

import { InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
    title?: string;
    sub_title?: string;
};

const Checkbox = ({ title, sub_title, style, type, ...props }: Props) => {
    return (
        <div style={style} className={styles.wrapper_label}>
            <input type={type} name="check" {...props} className={styles.checkbox} />
            {title && (
                <div className={styles.title}>
                    <span>{title}</span>
                    {sub_title && <p>{sub_title}</p>}
                </div>
            )}
        </div>
    );
};

export default Checkbox;

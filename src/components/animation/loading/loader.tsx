import styles from './loader.module.scss';

const Loader = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.loader}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
};

export default Loader;

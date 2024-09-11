'use client';

import Header from '@/components/header/header';
import Navigation from '@/components/navigation/navigation';
import styles from './root.module.scss';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

type Props = {
    children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
    return (
        <QueryClientProvider client={queryClient}>
            <main className={styles.wrapper_layout}>
                <Header />
                <div className={styles.wrapper}>
                    <Navigation />
                    <div className={styles.wrapper_children} style={{ minHeight: 2000 }}>
                        {children}
                    </div>
                </div>
            </main>
        </QueryClientProvider>
    );
};

export default Layout;

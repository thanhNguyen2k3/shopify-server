'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';

import Header from '@/components/header/header';
import Navigation from '@/components/navigation/navigation';
import styles from './root.module.scss';
import { useResponsive } from '@/hooks/useResponsive';

const queryClient = new QueryClient();

type Props = {
    children: React.ReactNode;
};

export const NavigationContext = createContext<{
    isOpenNavigation: boolean;
    toggleNavigation: () => void;
    setIsOpenNavigation: Dispatch<SetStateAction<boolean>>;
}>({
    isOpenNavigation: false,
    toggleNavigation: () => {},
    setIsOpenNavigation: () => false,
});

const Layout = ({ children }: Props) => {
    const breakpoints = useResponsive([768]);

    const [isOpenNavigation, setIsOpenNavigation] = useState<boolean>(false);
    const [showChild, setShowChild] = useState<boolean>(false);

    useEffect(() => {
        setShowChild(true);
    }, []);

    const toggleNavigation = () => {
        setIsOpenNavigation(!isOpenNavigation);
    };

    if (!showChild) {
        return null;
    }

    if (typeof window === 'undefined') {
        return <></>;
    } else {
        return (
            <QueryClientProvider client={queryClient}>
                <NavigationContext.Provider
                    value={{ isOpenNavigation: isOpenNavigation, setIsOpenNavigation, toggleNavigation }}
                >
                    <main className={styles.wrapper_layout} style={breakpoints === 0 ? { paddingLeft: 0 } : {}}>
                        <Header />
                        <div className={styles.wrapper}>
                            <Navigation
                                style={
                                    breakpoints === 0
                                        ? {
                                              width: 0,
                                              visibility: 'hidden',
                                              padding: 0,
                                          }
                                        : {}
                                }
                            />
                            <div className={styles.wrapper_children} style={{ minHeight: 2000 }}>
                                {children}
                            </div>
                        </div>
                    </main>
                </NavigationContext.Provider>
            </QueryClientProvider>
        );
    }
};

export default Layout;

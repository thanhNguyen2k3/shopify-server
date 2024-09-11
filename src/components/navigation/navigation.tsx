'use client';

import { GoHomeFill } from 'react-icons/go';
import { RiShoppingBagFill } from 'react-icons/ri';
import { BsArrowReturnRight } from 'react-icons/bs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from './navigation.module.scss';
type Props = {};

const Navigation = (props: Props) => {
    const menus = [
        {
            id: 'home',
            to: '/',
            title: 'Trang chủ',
            children: null,
            icon: GoHomeFill,
        },
        {
            id: 'products',
            to: '/products',
            title: 'Sản phẩm',
            icon: RiShoppingBagFill,
            children: [
                {
                    id: 'inventory',
                    to: '/inventory',
                    title: 'Kho hàng',
                },
                {
                    id: 'purchase_orders',
                    to: '/purchase_orders',
                    title: 'Đơn đặt hàng',
                },
                {
                    id: 'gift_cards',
                    to: '/gift_cards',
                    title: 'Thẻ tặng quà',
                },
            ],
        },
    ];

    const pathName = usePathname();
    const checkPathName = pathName.split('/')[1];

    return (
        <div className={styles.wrapper}>
            <ul className={styles.nav_list}>
                {menus.map((item) => {
                    const Icon = item.icon;
                    return (
                        <li key={item.id}>
                            <Link
                                className={`${styles.nav_link} ${`/${checkPathName}` === item.to && styles.active}`}
                                href={item.to}
                            >
                                <span className={styles.icon}>
                                    <Icon size={16} />
                                </span>
                                <span className={styles.title}>{item.title}</span>
                            </Link>

                            {item.children && (
                                <ul className={styles.sub_list}>
                                    {item.children.map((sub_item) => (
                                        <li key={sub_item.id}>
                                            <Link
                                                className={`${styles.sub_list_link} ${
                                                    `/${checkPathName}` === sub_item.to && styles.active
                                                }`}
                                                href={sub_item.to}
                                            >
                                                <span className={styles.icon}>
                                                    <BsArrowReturnRight size={16} />
                                                </span>
                                                <span className={styles.title}>{sub_item.title}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Navigation;

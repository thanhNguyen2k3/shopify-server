'use client';
import { MdCheck, MdOutlineInventory2 } from 'react-icons/md';
import { TfiTrash } from 'react-icons/tfi';
import { IoIosMore } from 'react-icons/io';
import { useState } from 'react';
import Image from 'next/image';

import Button from '@/components/button/button';
import styles from './products-table.module.scss';
import Search from '@/components/search/search';
import TippyCustom from '@/tippy/tippy-custom';
import Modal from '@/components/modal/modal';
import { VariantColor } from '@/types/variant-color';

type Props = {};

const ProductTable = (props: Props) => {
    // data

    const data = [
        {
            id: 1,
            title: 'Áo thun 1',
            status: 1,
            inventory: 20,
            category: 'Quần',
            product_type: 'Quần',
            image: '/logo.svg',
            vendor: 'Cửa hàng của tôi',
        },
        {
            id: 2,
            title: 'Áo thun 2',
            status: 1,
            inventory: 20,
            category: 'Quần',
            product_type: 'Quần',
            image: '/logo.svg',
            vendor: 'Cửa hàng của tôi',
        },
        {
            id: 3,
            title: 'Áo thun 3',
            status: 1,
            inventory: 20,
            category: 'Quần',
            product_type: 'Quần',
            image: '/logo.svg',
            vendor: 'Cửa hàng của tôi',
        },
    ];

    const labels = [
        {
            id: 'archived',
            title: 'Lưu trữ sản phẩm',
            variant: 'defaulted',
            icon: MdOutlineInventory2,
            children: {
                title: 'Lưu trữ sản phẩm?',
                body: 'Lưu trữ sản phẩm sẽ ẩn sản phẩm khỏi kênh bán hàng và trang quản trị Shopify. Bạn sẽ tìm thấy sản phẩm khi sử dụng bộ lọc trạng thái trong danh sách sản phẩm.',
                footer: 'Lưu trữ sản phẩm',
                variant: 'primary',
            },
        },
        {
            id: 'remove',
            title: 'Xóa sản phẩm',
            variant: 'error',
            icon: TfiTrash,
            children: {
                title: 'Xóa sản phẩm?',
                body: 'Thao tác này không thể hoàn tác.',
                footer: 'Xóa',
                variant: 'remove',
            },
        },
    ];

    // State
    const [ids, setIds] = useState<number[]>([]);
    const [selectedAll, setSelectedAll] = useState<boolean>(false);

    // Modal state
    const [modalContent, setModalContent] = useState<{
        title: string;
        body: string;
        footer: string;
        variant?: string;
    }>();
    const [showModal, setShowModal] = useState<boolean>(false);

    const handleGetContentForModal = (modal: any) => {
        setModalContent({ ...modal });
        setShowModal(true);
    };

    // Handle
    const isChecked = (value: number) => ids.includes(value);
    const handleSelected = (id: number) => {
        setIds((prev) => {
            if (prev.includes(id)) {
                return prev.filter((item) => item !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    const handleSelectedAll = () => {
        const selectedIds = data.map((item) => item.id);
        setSelectedAll(!selectedAll);

        if (selectedAll) {
            return setIds([]);
        } else {
            return setIds(selectedIds);
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.wrapper_header}>
                <div className={styles.wrapper_button}>
                    <Button activeType="button" variant="defaulted">
                        Tất cả
                    </Button>
                    <Button activeType="button" variant="defaulted">
                        Đang hoạt động
                    </Button>
                    <Button activeType="button" variant="defaulted">
                        Đã lưu trữ
                    </Button>
                </div>
                <div className={styles.wrapper_action}>
                    <Search />
                </div>
            </div>

            {/* Modal */}

            <Modal modal={showModal} setModal={setShowModal} {...modalContent} />

            {/* table */}

            <div className={styles.box}>
                {ids && ids.length > 0 && (
                    <div className={styles.table_action}>
                        <div style={{ display: 'flex', columnGap: 12 }}>
                            <div
                                onClick={handleSelectedAll}
                                className={`${styles.checkbox} ${selectedAll && styles.active}`}
                            >
                                <MdCheck />
                            </div>
                            <p>Đã chọn {ids.length} </p>
                        </div>
                        <div className={styles.table_action_item}>
                            <Button sx={{ height: 24 }} activeType="button" variant="custom">
                                Chỉnh sửa hàng loạt
                            </Button>
                            <Button sx={{ height: 24 }} activeType="button" variant="custom">
                                Đặt thành đang hoạt động
                            </Button>
                            <TippyCustom
                                interactive
                                trigger="click"
                                placement="bottom-end"
                                render={(attrs) => (
                                    <div {...attrs} className={styles.box_action}>
                                        {labels.map((label) => (
                                            <Button
                                                onClick={() => handleGetContentForModal(label.children)}
                                                activeType="button"
                                                icon={label.icon}
                                                placement="left"
                                                sx={{
                                                    width: '100%',
                                                    fontWeight: 500,
                                                    justifyContent: 'start',
                                                    height: 32,
                                                }}
                                                variant={label.variant}
                                                key={label.id}
                                            >
                                                {label.title}
                                            </Button>
                                        ))}
                                    </div>
                                )}
                            >
                                <Button
                                    sx={{ columnGap: 0 }}
                                    activeType="button"
                                    variant="custom"
                                    placement="left"
                                    icon={IoIosMore}
                                />
                            </TippyCustom>
                        </div>
                    </div>
                )}
                <div className={styles.table_wrapper}>
                    <table cellSpacing={0} cellPadding={0} className={styles.table}>
                        <thead className={styles.table_head}>
                            <tr>
                                <th>
                                    <div
                                        onClick={handleSelectedAll}
                                        className={`${styles.checkbox} ${selectedAll && styles.active}`}
                                    >
                                        <MdCheck />
                                    </div>
                                </th>
                                <th></th>
                                <th>Sản phẩm</th>
                                <th>Trạng thái</th>
                                <th>Hàng trong kho</th>
                                <th>Danh mục</th>
                                <th>Loại</th>
                                <th>Nhà cung cấp</th>
                            </tr>
                        </thead>
                        <tbody className={styles.table_body}>
                            {data.map((item) => {
                                return (
                                    <tr key={item.id} className={`${isChecked(item.id) && styles.checked}`}>
                                        <td>
                                            <div
                                                onClick={() => handleSelected(item.id)}
                                                className={`${styles.checkbox} ${isChecked(item.id) && styles.active}`}
                                            >
                                                <MdCheck />
                                            </div>
                                        </td>
                                        <td>
                                            <Image width={40} height={40} src={item.image} alt="image" />
                                        </td>
                                        <td>{item.title}</td>
                                        <td>{item.status && 'Đang hoạt động'}</td>
                                        <td>Còn {item.inventory} trong kho</td>
                                        <td>{item.category}</td>
                                        <td>{item.product_type}</td>
                                        <td>{item.vendor}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProductTable;

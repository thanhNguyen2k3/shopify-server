import { IoSearch, IoFilter, IoChevronDownOutline } from 'react-icons/io5';
import Tooltip from '@mui/material/Tooltip';
import { LuArrowDownUp } from 'react-icons/lu';
import { SyntheticEvent, useRef, useState } from 'react';
import { motion } from 'framer-motion';

import styles from './search.module.scss';
import Button from '@/components/button/button';
import { useDebounce } from '@/hooks/useDebounce';
import Separate from '../separate/separate';
import PopperFilter from '../popper/popper-filter';
import SearchInput from './search-input';
import PopperArrange from '../popper/popper-arrange';

type Props = {};

const Search = ({}: Props) => {
    const labels = [
        {
            id: 'arrange_title',
            title: 'Tiêu đề sản phẩm',
            query: 'title',
        },
        {
            id: 'arrange_created',
            title: 'Đã tạo',
            query: 'created',
        },
        {
            id: 'arrange_updated',
            title: 'Đã cập nhật',
            query: 'updated',
        },
        {
            id: 'arrange_inventory',
            title: 'Hàng trong kho',
            query: 'inventory_total',
        },
        {
            id: 'arrange_product_type',
            title: 'Loại sản phẩm',
            query: 'product_type',
        },
    ];

    const statuses = [
        {
            id: 'active',
            title: 'Đang hoạt động',
            query: 'active',
        },
        {
            id: 'draf',
            title: 'Đơn hàng nháp',
            query: 'draf',
        },
        {
            id: 'archived',
            title: 'Đã lưu trữ',
            query: 'archived',
        },
    ];
    // State

    const [showSearch, setShowSearch] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [statusesState, setStatusesState] = useState<string[]>([]);

    const debouncedValue = useDebounce(searchValue, 800);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleShowSearch = () => {
        setShowSearch(true);
    };

    const handleHideSearch = () => {
        setShowSearch(false);
    };

    const handleClear = () => {
        setSearchValue('');
        inputRef.current?.focus();
    };

    // Effect

    const handleSearchValue = (e: SyntheticEvent) => {
        const value = (e.target as HTMLInputElement).value;
        if (!value.startsWith(' ')) {
            setSearchValue(value);
        }

        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };

    return (
        <div className={styles.wrapper}>
            <motion.div
                animate={
                    showSearch
                        ? { padding: 8, height: 'auto', opacity: 1, visibility: 'visible' }
                        : { padding: 0, height: 0, opacity: 0, visibility: 'hidden' }
                }
                initial={{ height: 0 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.1, ease: 'linear' }}
                className={styles.search_box}
            >
                <div className={styles.box_background}>
                    {/* Search input */}
                    <SearchInput
                        ref={inputRef}
                        handleClear={handleClear}
                        onChange={handleSearchValue}
                        value={searchValue}
                        loading={loading}
                        name="search_product"
                        id="search_product"
                        placeholder="Tìm kiếm tất cả sản phẩm"
                    />

                    <div className={styles.wrapper_action}>
                        <Button onClick={handleHideSearch} activeType="button" variant="defaulted">
                            Hủy
                        </Button>

                        <PopperArrange icon={LuArrowDownUp} heading="Sắp xếp theo" labels={labels} title={'Sắp xếp'} />
                    </div>
                </div>
                <div className={styles.wrapper}>
                    <div className={styles.filter_action}>
                        <Button activeType="button" variant="dash" placement="right" icon={IoChevronDownOutline}>
                            Nhà cung cấp sản phẩm
                        </Button>
                        <Button activeType="button" variant="dash" placement="right" icon={IoChevronDownOutline}>
                            Gắn thẻ
                        </Button>
                        <PopperFilter
                            state={statusesState}
                            setState={setStatusesState}
                            data={statuses}
                            title="Trạng thái"
                        />
                    </div>
                </div>
            </motion.div>
            {showSearch && <Separate />}

            <div className={styles.wrapper_action}>
                <Tooltip title="Tìm kiếm và lọc" arrow placement="top">
                    <div className={styles.wrapper_search} onClick={handleShowSearch}>
                        <IoSearch size={20} />
                        <IoFilter size={20} />
                    </div>
                </Tooltip>
                <PopperArrange icon={LuArrowDownUp} labels={labels} title={'Sắp xếp'} />
            </div>
        </div>
    );
};

export default Search;

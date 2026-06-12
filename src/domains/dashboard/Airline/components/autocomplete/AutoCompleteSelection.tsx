import React, { useState, useCallback, useEffect } from 'react';

import { Flex, Input, List, Typography } from 'antd';
import debounce from 'lodash/debounce';

import { ITripData } from '../../types/airlineTypes';
import { ISearchData } from '../../types/searchAirports';
import '../../assets/style.css';

type Props = {
    options: ISearchData[] | undefined;
    onSelect: (loc: string, val: string) => void;
    searchKey: string | undefined;
    setSearchKey: (key: string) => void;
    tripData: ITripData;
    location: 'fromLocation1' | 'fromLocation' | 'toLocation1' | 'toLocation';
    disabled?: boolean;
    updateTripDetails?: (value: string) => void;
};

const Autocomplete = ({
    options,
    onSelect,
    searchKey,
    setSearchKey,
    location,
    tripData,
    disabled = false,
    updateTripDetails,
}: Props) => {
    const field = tripData[location];
    const [inputValue, setInputValue] = useState(searchKey || '');
    const [filteredOptions, setFilteredOptions] = useState<ISearchData[] | undefined>([]);
    const [selectedCode, setSelectedCode] = useState(field);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        setSelectedCode(field);
    }, [field]);

    // Debounced search handler
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleSearch = useCallback(
        debounce((searchText: string) => {
            setSearchKey(searchText);
            if (searchText === '') {
                onSelect(location, '');
                setSelectedCode('');
            }
        }, 300),
        [location, onSelect, setSearchKey]
    );

    // Immediate input change handler
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setInputValue(value);
        handleSearch(value);
    };

    // Handle option selection
    const handleSelectOption = useCallback(
        (option: ISearchData) => {
            setSelectedCode(option.value);
            setInputValue(option.location || '');
            setSearchKey(option.value);
            onSelect(location, option.value);
            updateTripDetails?.(option.countryCode);
            setIsFocused(false);
        },
        [location, onSelect, setSearchKey, updateTripDetails]
    );

    // Sync with external state
    useEffect(() => {
        const value = tripData[location as keyof ITripData];
        setInputValue(value !== undefined && value !== null ? String(value) : '');
    }, [location, tripData]);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setTimeout(() => setIsFocused(false), 200);
    };

    const updateFilteredOptions = () => {
        if (!options) return;
        const selectOption = options?.filter(option => option.value === selectedCode);

        if (selectOption) {
            const withoutSelected = options.filter(option => option.value !== selectedCode);
            setFilteredOptions([...selectOption, ...withoutSelected]);
        } else {
            setFilteredOptions(options);
        }
    };

    useEffect(() => {
        updateFilteredOptions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [options]);

    return (
        <Flex className="relative p-0 m-0" onFocus={handleFocus} onBlur={handleBlur}>
            <Input
                value={inputValue}
                onChange={handleChange}
                onClick={updateFilteredOptions}
                placeholder="Enter location"
                variant="borderless"
                className={`w-full font-semibold h-8 ${inputValue ? 'text-xl' : ''}`}
                disabled={disabled}
            />
            {isFocused && filteredOptions && filteredOptions.length > 0 && (
                <List
                    className="absolute z-10 ms-2 w-96 max-h-64 bg-white border border-gray-300 rounded mt-16 overflow-auto custom-list"
                    style={{ boxShadow: '0px 2px 8px 0px rgba(0, 0, 0, 0.09)' }}
                    dataSource={filteredOptions}
                    renderItem={item => (
                        <OptionItem
                            item={item}
                            isSelected={selectedCode === item.value}
                            onSelect={handleSelectOption}
                        />
                    )}
                />
            )}
        </Flex>
    );
};

// Memoized option component
const OptionItem = React.memo(
    ({
        item,
        isSelected,
        onSelect,
    }: {
        item: ISearchData;
        isSelected: boolean;
        onSelect: (item: ISearchData) => void;
    }) => (
        <List.Item
            style={{ padding: 8, borderBottom: 'none' }}
            className={`p-0 m-1 cursor-pointer ${isSelected ? 'bg-[#FFF1F0]' : 'hover:bg-[#fafafa]'}`}
            onMouseDown={() => onSelect(item)}
        >
            <Flex className="w-full" justify="space-between" align="center">
                <Flex className="w-4/5" vertical>
                    <Typography.Text className="text-sm font-medium">
                        {item.location}
                    </Typography.Text>
                    <Typography.Text className="text-xs font-normal">{item.label}</Typography.Text>
                </Flex>
                <Typography.Text className="text-xs font-medium w-1/5 text-center">
                    {item.value}
                </Typography.Text>
            </Flex>
        </List.Item>
    )
);

export default Autocomplete;

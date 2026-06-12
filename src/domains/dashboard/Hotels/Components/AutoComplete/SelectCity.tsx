import React, { useEffect, useState } from 'react';

import { Flex, Input, List, Typography } from 'antd';

import { City } from '../../types/types';

interface selectProps {
    options: City[] | undefined;
    onSelect: (value: string, name: string) => void;
    searchKey: string;
    setSearchKey: (value: string) => void;
    defaultvalue?: string;
    textSize: string;
    disabled?: boolean;
    isCityLoading?: boolean;
}

const SelectCity = ({
    options,
    onSelect,
    searchKey,
    setSearchKey,
    defaultvalue,
    textSize,
    disabled = false,
    isCityLoading,
}: selectProps) => {
    const [filteredOptions, setFilteredOptions] = useState<City[]>(options || []);
    const [selectedValue, setSelectedValue] = useState<any>(defaultvalue);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [selectedCode, setSelectedCode] = useState<any>('');

    useEffect(() => {
        setSelectedValue(defaultvalue);
        setSelectedCode(''); // Reset selected city when country changes
        setFilteredOptions([]); // Clear city list when country changes
    }, [defaultvalue]);

    useEffect(() => {
        setFilteredOptions([]);
    }, [options]);

    const handleInputChange = (searchText: string) => {
        setSearchKey(searchText);
        setSelectedValue(searchText);

        if (searchText === '') {
            setFilteredOptions([]); // Clear options immediately on empty input

            onSelect('', '');
            setSelectedCode('');
        } else {
            const filtered = options?.filter(city =>
                city.Name.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredOptions(filtered || []);
        }
    };

    const handleSelectOption = (option: City) => {
        setSelectedCode(option.Name);
        setSearchKey(option.Code);
        setFilteredOptions([]);
        setSelectedValue(option.Name);
        onSelect(option.Code, option.Name);
    };

    // function toTitleCase(str: string) {
    //     if (!str) return ''; // Add this check for undefined or empty string
    //     return str
    //         .toLowerCase()
    //         .replace(/\s+/g, ' ') // replace multiple spaces with single space
    //         .trim() // remove trailing spaces
    //         .replace(/(?:^|\s)\w/g, match => match.toUpperCase());
    // }
    function toTitleCase(str: string): string {
        if (!str) return '';

        const lowerCaseWords = ['and'];

        return str
            .toLowerCase()
            .replace(/\s+/g, ' ')
            .trim()
            .split(' ')
            .map((word, index) => {
                if (index === 0 || !lowerCaseWords.includes(word)) {
                    return word.charAt(0).toUpperCase() + word.slice(1);
                }
                return word;
            })
            .join(' ');
    }

    return (
        <Flex
            className="relative p-0 m-0"
            onBlur={() => setTimeout(() => setFilteredOptions([]), 200)}
        >
            <Input
                data-testid="location"
                type="text"
                placeholder="Enter City"
                value={`${toTitleCase(selectedValue)}`}
                maxLength={20}
                onChange={e => handleInputChange(e.target.value)}
                onClick={() => {
                    if (selectedValue) {
                        // Show only the selected city when clicking on the field
                        const filtered = options?.filter(option => option.Name === selectedValue);
                        setFilteredOptions(filtered?.length ? filtered : options || []);
                    } else {
                        setFilteredOptions(options || []);
                    }
                }}
                className={`w-full font-medium text-black h-10 md:ml-1 ${textSize}`}
                disabled={disabled}
                variant="borderless"
            />

            {filteredOptions && filteredOptions.length > 0 && (
                <List
                    className="absolute z-10 w-80 max-h-64 bg-white border border-gray-300 rounded mt-16 overflow-scroll"
                    bordered
                    dataSource={filteredOptions}
                    renderItem={(item, index) =>(
                            <List.Item
                                key={index}
                                style={{ padding: 8 }}
                                className={`p-0 m-1 cursor-pointer ${
                                    filteredOptions.length === 1 && selectedValue === item.Name
                                        ? 'bg-[#FFF1F0]'
                                        : 'hover:bg-[#fafafa]'
                                }`}
                                onMouseDown={() => handleSelectOption(item)}
                            >
                                <Flex className="w-full" justify="space-between" align="center">
                                    <Typography.Text className="text-sm font-medium">
                                        {toTitleCase(item.Name)}
                                    </Typography.Text>
                                </Flex>
                            </List.Item>
                        )
                    }
                />
            )}
        </Flex>
    );
};

export default SelectCity;

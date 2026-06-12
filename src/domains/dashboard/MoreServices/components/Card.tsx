import React from 'react';

import { Flex, Grid, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import '../assets/styles.css';

interface IconCardProps {
    icon: string;
    title: string;
    path: string;
    status: string;
}

const Card: React.FC<IconCardProps> = ({ icon, title, path, status }) => {
    let color = '';

    if (status === 'Free') {
        color = 'text-green-500';
    } else if (status === 'New') {
        color = 'text-red-500';
    } else if (status === 'Coming soon') {
        color = 'text-orange-500';
    }
    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();

    return (
        <Flex vertical align="center">
            <Link to={path}>
                <Flex
                    vertical
                    align="center"
                    className="transition duration-300 transform cursor-pointer hover:scale-105"
                >
                    <Flex
                        className={`w-16 h-16 sm:w-[6.75rem] sm:h-28 bg-bgIconCard rounded-2xl sm:rounded-3xl text-${color}`}
                        align="center"
                        justify="center"
                    >
                        <ReactSVG
                            className="more-services"
                            beforeInjection={svg => {
                                if (screens.xs) {
                                    svg.setAttribute('style', 'width: 20px; height: 20px;');
                                }
                            }}
                            src={icon}
                        />
                    </Flex>
                    <Typography.Text className="text-[.65rem] text-center sm:text-[0.875rem] min-h-9 sm:min-h-14 line-clamp-2 pt-1 sm:pt-3">
                        {title}
                    </Typography.Text>
                </Flex>
            </Link>
        </Flex>
    );
};

export default Card;

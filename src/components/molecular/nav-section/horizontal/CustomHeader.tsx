import { useState } from 'react';

import { Avatar, Badge, Divider, Flex, Image, Popover, Typography, theme } from 'antd';
import { IoIosClose } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';

import NotificationIcon from '@assets/icons/Notification.svg';
import LogoutIcon from '@assets/svg/Logout.svg';
import pekoConnect from '@assets/svg/pekoConnect.svg';
import ChatService from '@components/molecular/freshChat/service/ChatService';
import SearchTree from '@components/molecular/searchTree/SearchTree';
import ServiceSearch from '@components/molecular/searchTree/ServiceSearch';
import { UserRole } from '@customtypes/general';
import { useAppSelector } from '@src/hooks/store';
import useNotificationApi from '@src/hooks/useNotificationApi';
import useSubUserLogout from '@src/hooks/useSubUserLogout';
import useUserInfo from '@src/hooks/useUserInfo';
import { paths } from '@src/routes/paths';
import { handleLogout } from '@src/services/handleLogout';
import { formatNumberWithLocalString } from '@utils/priceFormat';
import formatString from '@utils/wordFormat';

import NotificationsList from '../NotificationsList';

const { Text } = Typography;

const CustomHeader = () => {
    const { resetNotificationCount } = useNotificationApi();
    useUserInfo();
    useSubUserLogout();
    const navigate = useNavigate();
    const { user, notifications } = useAppSelector(state => state.reducer.user);
    const { roleName, role, sessionId } = useAppSelector(state => state.reducer.auth);
    const freshChatDetails = useAppSelector(state => state.reducer.freshChat);
    const [open, setOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const email: string | undefined =
        roleName === 'corporate sub user' ? user?.subCorporateEmail : user?.email;
    const mobile: string | undefined =
        roleName === 'corporate sub user' ? user?.subCorporateMobile : user?.mobileNo;
    const credentialId: number | undefined =
        roleName === 'corporate sub user' ? user?.subCorporateCredential : user?.credentialId;

    // const restoreId: string | undefined = user?.chatId;
    const restoreId: string | undefined = freshChatDetails?.chatId;
    let userRole: string | undefined;
    let companyName: string | undefined;

    if (user) {
        userRole = user.role;
        // eslint-disable-next-line prefer-destructuring
        companyName = user.companyName;
    }

    const {
        token: { colorPrimary },
    } = theme.useToken();

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
    };

    const handleProfileClick = () => {
        navigate(role === UserRole.CORPORATE ? paths.dashboard.profile : paths.systemUser.profile);
    };

    const authChannel = new BroadcastChannel('authChannel');

    return (
        <>
            {userRole === 'CORPORATE' && (
                <ChatService
                    name={companyName}
                    email={email}
                    mobile={mobile}
                    credentialId={credentialId}
                    restoreId={restoreId}
                    role={role}
                    sessionId={sessionId}
                />
            )}
            <Flex className="hidden w-full lg:flex" align="center" justify="space-between" gap={22}>
                {role === UserRole.SYSTEM && (
                    <Flex align="center" className="w-4/12">
                        <SearchTree />
                    </Flex>
                )}
                <>
                    {role === UserRole.CORPORATE && (
                        <Flex align="center" className="w-4/12 ">
                            <Flex align="center" className="relative w-full mySearchClass">
                                <ServiceSearch classes="-mt-3" variant="borderless" />
                                <Flex justify="end" align="end">
                                    <Divider type="vertical" className="h-12 mx-0" />
                                </Flex>
                            </Flex>
                        </Flex>
                    )}
                </>
                <Flex justify="flex-end" align="center" gap={20}>
                    {roleName !== 'corporate sub user' && (
                        <>
                            <Link to={paths.pekoWallet.index}>
                                <Flex
                                    vertical
                                    align="center"
                                    justify="center"
                                    className="whitespace-nowrap"
                                >
                                    <Typography.Text className="text-xs">Wallet</Typography.Text>
                                    <Typography.Text className="text-sm font-semibold">
                                        {`₹ ${formatNumberWithLocalString(user?.balance! ?? 0)}`}
                                    </Typography.Text>
                                </Flex>
                            </Link>
                            <Divider type="vertical" className="h-12" />
                        </>
                    )}

                    {role === 'corporate' && (
                        <>
                            {roleName !== 'corporate sub user' && user?.isPekoCreditAvailable && (
                                <>
                                    {user?.isPekoCreditActive === false ? (
                                        <Link to={paths.pekoCredits.index}>
                                            <Flex className="w-20 p-2 text-xs border rounded-lg text-lightRed border-lightRed bg-iconBgRed ">
                                                Claim your free credits
                                            </Flex>
                                        </Link>
                                    ) : (
                                        <Link to={paths.pekoCredits.index}>
                                            <Flex
                                                vertical
                                                align="center"
                                                justify="center"
                                                className="whitespace-nowrap"
                                            >
                                                <Typography.Text className="text-xs">
                                                    Peko Credits
                                                </Typography.Text>
                                                <Typography.Text className="text-sm font-semibold">
                                                    ₹ {user?.pekoCredits ?? '0'}
                                                </Typography.Text>
                                            </Flex>
                                        </Link>
                                    )}
                                    <Divider type="vertical" className="h-12" />
                                </>
                            )}

                            {/* <Link to={paths.pekoClub.index}>
                                <Flex className="py-1 border-t border-b cursor-pointer border-brandColor">
                                    <Typography.Text className="font-semibold text-brandColor whitespace-nowrap">
                                        Peko Club
                                    </Typography.Text>
                                </Flex>
                            </Link>
                            <Divider type="vertical" className="h-12" /> */}

                            {/* {user?.roleName === 'corporate' && ( */}
                            <>
                                <Link
                                    className='hidden'
                                    to={`${paths.dashboard.moreServices}/${paths.pekoConnect.index}`}
                                >
                                    <Flex className="cursor-pointer">
                                        <Badge count={0} offset={[-5, 5]}>
                                            <Avatar
                                                size={32}
                                                shape="square"
                                                src={pekoConnect}
                                                className="cursor-pointer"
                                            />
                                        </Badge>
                                    </Flex>
                                </Link>
                                <Divider rootClassName='hidden' type="vertical" className="h-12" />
                            </>
                            {/* )} */}
                            <Popover
                                content={
                                    <div className="px-4">
                                        {NotificationsList()}
                                        <Flex className="w-full py-4" justify="end">
                                            {(notifications?.data?.length ?? 0) > 0 && (
                                                <Link to={paths.dashboard.notifications}>
                                                    <Typography.Link
                                                        className="text-sm"
                                                        style={{ color: colorPrimary }}
                                                        onClick={() => {
                                                            resetNotificationCount();
                                                            setOpen(false);
                                                        }}
                                                    >
                                                        See More
                                                    </Typography.Link>
                                                </Link>
                                            )}
                                        </Flex>
                                    </div>
                                }
                                trigger="hover"
                                // overlayInnerStyle={{ padding: 0, minWidth: 260 }}//
                                styles={{body:{padding: 0, minWidth: 260}}}
                                open={open}
                                title={() => (
                                    <Flex className="px-8 py-4 border-b" justify="space-between">
                                        <Text className="text-lg font-semibold">Notifications</Text>
                                        <IoIosClose
                                            className="text-2xl cursor-pointer text-black/45"
                                            onClick={() => setOpen(false)}
                                        />
                                    </Flex>
                                )}
                                placement="bottomRight"
                                onOpenChange={handleOpenChange}
                            >
                                <Badge count={notifications?.count || 0} offset={[-5, 5]}>
                                    <Avatar
                                        onClick={resetNotificationCount}
                                        shape="circle"
                                        src={NotificationIcon}
                                        className="cursor-pointer"
                                    />
                                </Badge>
                            </Popover>
                            <Divider type="vertical" className="h-12" />
                        </>
                    )}

                    <Flex
                        gap={10}
                        align="center"
                        onClick={handleProfileClick}
                        className="cursor-pointer"
                    >
                        <Avatar
                            src={user?.logo}
                            size="large"
                            draggable={false}
                            className="bg-[#ffeeee]"
                        >
                            <Text style={{ color: colorPrimary }} className="text-2xl font-bold ">
                                {user?.companyName?.slice(0, 1).toUpperCase()}
                            </Text>
                        </Avatar>
                        <Flex vertical>
                            <Text className="text-xs font-semibold text-black myNavClass">
                                {user?.companyName}
                            </Text>
                            <Text className="text-gray-400 myNavClass">
                                {formatString(user?.roleName)}
                            </Text>
                        </Flex>
                    </Flex>
                    <Image
                        src={LogoutIcon}
                        width={40}
                        preview={false}
                        onClick={async () => {
                            if (!isLoggingOut) {
                                setIsLoggingOut(true);
                                await handleLogout().finally(() => {
                                    setIsLoggingOut(false);
                                    authChannel.postMessage('logout');
                                });
                            }
                        }}
                        className="pl-4 cursor-pointer"
                    />
                </Flex>
            </Flex>
        </>
    );
};

export default CustomHeader;

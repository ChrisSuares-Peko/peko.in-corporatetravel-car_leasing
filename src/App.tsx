import { useEffect } from 'react';

import { v4 as uuidv4 } from 'uuid';

import AntdConfig from './antd.config';
import useCustomNotification from './hooks/useCustomNotification';
import { useScrollToTop } from './hooks/useScrollToTop';
// eslint-disable-next-line import/no-cycle
import Router from './routes/sections';
import { clearData } from './services/handleLogout';

export const TAB_ID = uuidv4();

function App() {
    useScrollToTop();
    const { contextHolder } = useCustomNotification();
    const authChannel = new BroadcastChannel('authChannel');

    useEffect(() => {
        const handleLogoutEvent = (event: any) => {
            if (event.data === 'logout') {
                clearData();
            }
            if (event.data === 'login') {
                window.location.reload();
            }
        };

        authChannel.addEventListener('message', handleLogoutEvent);

        return () => {
            authChannel.removeEventListener('message', handleLogoutEvent);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <AntdConfig>
            {contextHolder}
            <Router />
        </AntdConfig>
    );
}

export default App;

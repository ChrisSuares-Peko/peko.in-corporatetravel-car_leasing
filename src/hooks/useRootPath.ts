// useRootPath hook
import { UserRole } from '@customtypes/general';
import { useAppSelector } from '@src/hooks/store';
import { paths } from '@src/routes/paths';

export const useRootPath = () => {
    const { role } = useAppSelector(state => state.reducer.auth);

    switch (role) {
        case UserRole.CORPORATE:
            return paths.dashboard.home;
        case UserRole.SYSTEM:
            return paths.systemUser.dashboard;
        default:
            return '/auth/login';
    }
};

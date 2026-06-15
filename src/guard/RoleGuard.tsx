type RoleGuardProps = {
    children: React.ReactNode;
};

export default function RoleGuard({ children }: RoleGuardProps) {
    return <>{children}</>;
}

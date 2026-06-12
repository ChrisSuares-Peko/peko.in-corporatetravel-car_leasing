import React from 'react';

export const iconCircle: React.CSSProperties = {
    width: 48,
    height: 48,
    background: '#F9FAFB',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
};

interface TabLayoutProps {
    image: { src: string; alt: string };
    children: React.ReactNode;
}

export const TabLayout: React.FC<TabLayoutProps> = ({ image, children }) => (
    <div style={{ display: 'flex', alignItems: 'flex-start', paddingTop: 16, paddingBottom: 16 }}>
        <div style={{ width: '55%', paddingRight: 48, boxSizing: 'border-box' }}>{children}</div>
        <div
            style={{
                width: '45%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                paddingTop: 8,
            }}
        >
            <img
                src={image.src}
                alt={image.alt}
                style={{ width: 280, height: 240, objectFit: 'contain', display: 'block' }}
            />
        </div>
    </div>
);

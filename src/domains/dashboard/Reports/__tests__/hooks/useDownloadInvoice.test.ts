import { renderHook, act } from '@testing-library/react';
import { saveAs } from 'file-saver';
import { vi, describe, it, expect } from 'vitest';

import { downloadInvoice } from '../../api/index';
import { useDownloadInvoice } from '../../hooks/useDownloadInvoice';

// Mocking dependencies
vi.mock('../../api/index', () => ({
    downloadInvoice: vi.fn(),
}));

vi.mock('file-saver', () => ({
    saveAs: vi.fn(),
}));

vi.mock('@src/hooks/store', () => ({
    useAppSelector: vi.fn(() => ({ role: 'admin', id: 123 })),
}));

describe('useDownloadInvoice Hook', () => {
    it('should set loading to true, call API, and set loading to false', async () => {
        const mockResponse = {
            pdfBuffer: { data: [1, 2, 3, 4] }, // Simulating buffer data
        };

        (downloadInvoice as any).mockResolvedValue(mockResponse);

        const { result } = renderHook(() => useDownloadInvoice());

        await act(async () => {
            result.current.getInvoiceData(456);
        });

        expect(result.current.loader).toBe(false);
        expect(downloadInvoice).toHaveBeenCalledWith({
            userId: 123,
            userType: 'admin',
            transactionID: 456,
        });
        expect(saveAs).toHaveBeenCalled();
    });

    it('should handle API failure gracefully', async () => {
        // Mock API call to return `false` (indicating failure)
        (downloadInvoice as any).mockResolvedValue(false);

        const { result } = renderHook(() => useDownloadInvoice());

        await act(async () => {
            await result.current.getInvoiceData(789);
        });

        expect(downloadInvoice).toHaveBeenCalledWith({
            userId: 123,
            userType: 'admin',
            transactionID: 789,
        });
    });

    it('should set loader state correctly during API call', async () => {
        (downloadInvoice as any).mockImplementation(
            () =>
                new Promise(resolve =>
                    setTimeout(() => resolve({ pdfBuffer: { data: [1, 2, 3, 4] } }), 1000)
                )
        );

        const { result } = renderHook(() => useDownloadInvoice());

        act(() => {
            result.current.getInvoiceData(123);
        });

        expect(result.current.loader).toBe(true); // Loader should be true immediately

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating API delay
        });

        expect(result.current.loader).toBe(false);
    });
});

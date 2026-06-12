import { CommonFileBuffer, SuccessGenericResponse, UserPayload } from '@customtypes/general';
import { ApiClient } from '@src/services/config';

import { CreateInvoicePayload, CustomerOption } from '../types/createInvoice';
import { DashboardStats } from '../types/dashboard';
import {
    GetAllInvoicesPayload,
    GetAllInvoicesResponse,
    GetInvoiceByIdResponse,
} from '../types/invoice';
import { RemindersApiResponse, SaveReminderPayload } from '../types/invoiceDetails';
import { GetSettingsResponse, SaveSettingsPayload } from '../types/settings';

export const getAllCustomersForSelect = async (payload: UserPayload) => {
    try {
        const { userId, userType } = payload;
        const resp: SuccessGenericResponse<CustomerOption[]> = await ApiClient.get(
            `${userType}/${userId}/officeAndBusiness/invoicing/v2/customers`
        );
        return resp.data;
    } catch {
        return false;
    }
};

export const getAllInvoices = async (payload: UserPayload & GetAllInvoicesPayload) => {
    try {
        const { userId, userType, endDate, startDate, ...rest } = payload;
        const resp: SuccessGenericResponse<GetAllInvoicesResponse> = await ApiClient.get(
            `${userType}/${userId}/officeAndBusiness/invoicing/v2/all`,
            {
                params: {
                    ...rest,
                    to: endDate,
                    from: startDate,
                },
            }
        );
        return resp.data;
    } catch {
        return false;
    }
};

export const getInvoiceById = async (payload: UserPayload & { invoiceId: string }) => {
    try {
        const { userId, userType, invoiceId } = payload;
        const resp: SuccessGenericResponse<GetInvoiceByIdResponse> = await ApiClient.get(
            `${userType}/${userId}/officeAndBusiness/invoicing/v2/${invoiceId}`
        );
        return resp.status ? resp.data : false;
    } catch {
        return false;
    }
};

export const updateInvoice = async (payload: CreateInvoicePayload & { invoiceId: string }) => {
    try {
        const { userId, userType, invoiceId, ...restPayload } = payload;
        const resp: SuccessGenericResponse<{ id: string }> = await ApiClient.put(
            `${userType}/${userId}/officeAndBusiness/invoicing/v2/${invoiceId}`,
            restPayload
        );
        return resp;
    } catch {
        return false;
    }
};

export const downloadInvoicePdfApi = async (
    payload: UserPayload & { invoiceId: string; type?: string }
) => {
    try {
        const { userId, userType, invoiceId, type } = payload;
        const resp: SuccessGenericResponse<CommonFileBuffer> = await ApiClient.get(
            `${userType}/${userId}/officeAndBusiness/invoicing/v2/downloadInvoice/${invoiceId}`,
            { params: type ? { type } : undefined }
        );
        return resp;
    } catch {
        return false;
    }
};

export const deleteInvoiceApi = async (payload: UserPayload & { invoiceId: string }) => {
    try {
        const { userId, userType, invoiceId } = payload;
        const resp: SuccessGenericResponse<{}> = await ApiClient.delete(
            `${userType}/${userId}/officeAndBusiness/invoicing/v2/${invoiceId}`
        );
        return resp;
    } catch {
        return false;
    }
};

export const createInvoice = async (payload: CreateInvoicePayload) => {
    try {
        const { userId, userType, ...restPayload } = payload;
        const resp: SuccessGenericResponse<{ id: string }> = await ApiClient.post(
            `${userType}/${userId}/officeAndBusiness/invoicing/v2`,
            restPayload
        );
        return resp;
    } catch (err) {
        return false;
    }
};
export const recordManualPaymentApi = async (
    payload: UserPayload & {
        invoiceId: string;
        amount: number;
        paymentMethod: string;
        paymentDate: string;
        referenceId?: string;
        notes?: string;
    }
) => {
    try {
        const { userId, userType, invoiceId, ...body } = payload;
        const resp: SuccessGenericResponse<{}> = await ApiClient.post(
            `${userType}/${userId}/officeAndBusiness/invoicing/v2/${invoiceId}/manual-payment`,
            body
        );
        return resp;
    } catch {
        return false;
    }
};

export const saveReminders = async (
    payload: UserPayload & { invoiceId: string; reminders: SaveReminderPayload[] }
) => {
    try {
        const { userId, userType, invoiceId, reminders } = payload;
        const resp: SuccessGenericResponse<RemindersApiResponse> = await ApiClient.patch(
            `${userType}/${userId}/officeAndBusiness/invoicing/v2/${invoiceId}/reminder-settings`,
            { reminders }
        );
        return resp;
    } catch {
        return false;
    }
};

export const getDashboardStats = async (payload: UserPayload) => {
    try {
        const { userId, userType } = payload;
        const resp: SuccessGenericResponse<DashboardStats> = await ApiClient.get(
            `${userType}/${userId}/officeAndBusiness/invoicing/v2/dashboard`
        );
        return resp;
    } catch {
        return false;
    }
};

export const getSettingsApi = async (payload: UserPayload) => {
    try {
        const { userId, userType } = payload;
        const resp: SuccessGenericResponse<GetSettingsResponse> = await ApiClient.get(
            `${userType}/${userId}/officeAndBusiness/invoicing/v2/settings`
        );
        return resp;
    } catch {
        return false;
    }
};

export const createPaymentLinkApi = async (
    payload: UserPayload & {
        amount: string;
        expiry_time: string;
        customerName?: string;
        customerPhone?: string;
        invoiceId?: string;
    }
) => {
    try {
        const { userId, userType, ...body } = payload;
        const resp: SuccessGenericResponse<{ paymentLink: string }> = await ApiClient.post(
            `${userType}/${userId}/payment/payment-links`,
            {
                amount: Number(body.amount),
                purpose_message: `Invoice payment`,
                expiry_time: body.expiry_time,
                customerName: body.customerName,
                customerPhone: body.customerPhone,
                accessKey: 'invoice',
                invoiceId: String(body.invoiceId),
            }
        );
        return resp;
    } catch {
        return false;
    }
};

export const saveSettingsApi = async (payload: UserPayload & SaveSettingsPayload) => {
    try {
        const { userId, userType, ...body } = payload;
        const resp: SuccessGenericResponse<GetSettingsResponse> = await ApiClient.post(
            `${userType}/${userId}/officeAndBusiness/invoicing/v2/settings`,
            body
        );
        return resp;
    } catch {
        return false;
    }
};

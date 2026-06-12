import { CommonFileBuffer, SuccessGenericResponse } from '@customtypes/general';
import { ApiClient } from '@src/services/config';

import {
    AssignmentData,
    assignPayload,
    DLData,
    DrivingLicenseResponseV2,
    filterState,
    updatePayload,
    UserPayload,
    VehicleData,
    verifyPayload,
} from '../types';

export const verify = async (payload: verifyPayload) => {
    let reqbody;
    if (payload.type === 'dl') {
        reqbody = {
            doc_identity_no: payload.doc_identity_no,
            dob: payload.dob,
        };
    } else {
        reqbody = {
            doc_identity_no: payload.doc_identity_no,
        };
    }
    try {
        const resp: SuccessGenericResponse<DLData> = await ApiClient.post(
            `${payload.userType}/${payload.userId}/officeAndBusiness/garage/verify/${payload.type}`,
            reqbody
        );

        const { data } = resp;

        return data;
    } catch (err) {
        return false;
    }
};

export const getDashboardData = async (payload: any) => {
    try {
        const resp: SuccessGenericResponse<VehicleData> = await ApiClient.get(
            `${payload.userType}/${payload.userId}/officeAndBusiness/garage`
        );

        const { data } = resp;

        return data;
    } catch (err) {
        return false;
    }
};

export const getRefreshData = async (payload: any) => {
    try {
        const resp: SuccessGenericResponse<VehicleData> = await ApiClient.get(
            `${payload.userType}/${payload.userId}/officeAndBusiness/garage/refresh`
        );

        const { data } = resp;

        return data;
    } catch (err) {
        return false;
    }
};

export const addDoc = async (payload: verifyPayload) => {
    try {
        let reqbody;
        if (payload.type === 'dl') {
            reqbody = {
                doc_identity_no: payload.doc_identity_no,
                dob: payload.dob,
                vehicleId: payload?.vehicleId
            };
            
        } else {
            reqbody = {
                doc_identity_no: payload.doc_identity_no,
            };
        }
        const resp: SuccessGenericResponse<DrivingLicenseResponseV2> = await ApiClient.post(
            `${payload.userType}/${payload.userId}/officeAndBusiness/garage/add/${payload.type}`,
            reqbody
        );
        const { data } = resp;

        return data;
    } catch (err) {
        return false;
    }
};
export const getAllFleets = async (payload: filterState & UserPayload) => {
    try {
        const res: SuccessGenericResponse<any> = await ApiClient.get(
            `${payload.userType}/${payload.userId}/officeAndBusiness/garage/fleets`,
            {
                params: {
                    // from: payload.from,
                    // to: payload.to,
                    searchText: payload.searchText,
                    // sort: payload.sort,
                    page: payload.page,
                    // filter: payload.filter,
                    itemsPerPage: 10,
                    // sortField: payload.sortField,
                },
            }
        );
        const { data } = res;

        return data;
    } catch (error) {
        return false;
    }
};

export const getAllDocs = async (payload: filterState & UserPayload) => {
    try {
        const res: SuccessGenericResponse<any> = await ApiClient.get(
            `${payload.userType}/${payload.userId}/officeAndBusiness/garage/documents`,
            {
                params: {
                    from: payload.from,
                    to: payload.to,
                    searchText: payload.searchText,
                    // sort: payload.sort,
                    page: payload.page,
                    // filter: payload.filter,
                    itemsPerPage: 10,
                    // sortField: payload.sortField,
                },
            }
        );
        const { data } = res;

        return data;
    } catch (error) {
        return false;
    }
};

export const createDocument = async (payload: assignPayload) => {
    try {
        const resp: SuccessGenericResponse<AssignmentData> = await ApiClient.post(
            `${payload.userType}/${payload.userId}/officeAndBusiness/garage/documents`,
            payload
        );

        // const { data } = resp;

        return resp;
    } catch (err) {
        return false;
    }
};
export const updateDocument = async (payload: updatePayload) => {

    try {
        const resp: SuccessGenericResponse<AssignmentData> = await ApiClient.put(
            `${payload.userType}/${payload.userId}/officeAndBusiness/garage/documents/${payload.docId}`,
            payload
        );

        // const { data } = resp;

        return resp;
    } catch (err) {
        return false;
    }
};
export const deleteDocument = async (payload: any) => {
    try {
        const resp: SuccessGenericResponse<AssignmentData> = await ApiClient.delete(
            `${payload.userType}/${payload.userId}/officeAndBusiness/garage/documents/${payload.docId}`
        );

        // const { data } = resp;

        return resp;
    } catch (err) {
        return false;
    }
};

export const getAllDrivers = async (payload: filterState & UserPayload) => {
    try {
        const res: SuccessGenericResponse<any> = await ApiClient.get(
            `${payload.userType}/${payload.userId}/officeAndBusiness/garage/drivers`,
            {
                params: {
                    // from: payload.from,
                    // to: payload.to,
                    searchText: payload.searchText,
                    // sort: payload.sort,
                    page: payload.page,
                    // filter: payload.filter,
                    itemsPerPage: 10,
                    // sortField: payload.sortField,
                },
            }
        );
        const { data } = res;

        return data;
    } catch (error) {
        return false;
    }
};
export const getAllLogs = async (payload: filterState & UserPayload) => {
    try {
        const res: SuccessGenericResponse<any> = await ApiClient.get(
            `${payload.userType}/${payload.userId}/officeAndBusiness/garage/logs`,
            {
                params: {
                    from: payload.from,
                    to: payload.to,
                    searchText: payload.searchText,

                    page: payload.page,

                    itemsPerPage: 10,
                },
            }
        );
        const { data } = res;

        return data;
    } catch (error) {
        return false;
    }
};
export const assign = async (payload: assignPayload) => {
    try {
        const resp: SuccessGenericResponse<AssignmentData> = await ApiClient.post(
            `${payload.userType}/${payload.userId}/officeAndBusiness/garage/assignment`,
            payload
        );

        const { data } = resp;

        return data;
    } catch (err) {
        return false;
    }
};

export const deleteFleet = async (payload: any) => {
    try {
        const resp: SuccessGenericResponse<AssignmentData> = await ApiClient.delete(
            `${payload.userType}/${payload.userId}/officeAndBusiness/garage/fleet/${payload.id}`,
            payload
        );

        // const { data } = resp;

        return resp;
    } catch (err) {
        return false;
    }
};
export const getFileBufferReport = async (payload: UserPayload & any) => {
    try {
        const resp: SuccessGenericResponse<CommonFileBuffer> = await ApiClient.get(
            `${payload.userType}/${payload.userId}/officeAndBusiness/garage/fleets/${payload.type}?searchText=${payload?.searchText ?? ""}`
        );
        const { data } = resp;
        return data;
    } catch (err) {
        return false;
    }
};
export const getFileBufferDriverReport = async (payload: UserPayload & any) => {
    try {
        const resp: SuccessGenericResponse<CommonFileBuffer> = await ApiClient.get(
            `${payload.userType}/${payload.userId}/officeAndBusiness/garage/drivers/${payload.type}`,
            {
                params: {
                    // from: payload.from,
                    // to: payload.to,
                    searchText: payload.searchText,

                    page: payload.page,

                    itemsPerPage: 10,
                },
            }
        );
        const { data } = resp;
        return data;
    } catch (err) {
        return false;
    }
};
export const deleteDriver = async (payload: any) => {
    try {
        const resp: SuccessGenericResponse<AssignmentData> = await ApiClient.delete(
            `${payload.userType}/${payload.userId}/officeAndBusiness/garage/driver/${payload.id}`,
            payload
        );

        // const { data } = resp;

        return resp;
    } catch (err) {
        return false;
    }
};

export const getFleet = async (payload: any) => {
    try {
        const resp: SuccessGenericResponse<VehicleData> = await ApiClient.get(
            `${payload.userType}/${payload.userId}/officeAndBusiness/garage/fleet/${payload.id}`
        );

        const { data } = resp;

        return data;
    } catch (err) {
        return false;
    }
};
export const getUsage = async (payload: any) => {
    try {
        const resp: SuccessGenericResponse<VehicleData> = await ApiClient.get(
            `${payload.userType}/${payload.userId}/officeAndBusiness/garage/usage-count`
        );

        const { data } = resp;

        return data;
    } catch (err) {
        return false;
    }
};
export const getDriver = async (payload: any) => {
    try {
        const resp: SuccessGenericResponse<VehicleData> = await ApiClient.get(
            `${payload.userType}/${payload.userId}/officeAndBusiness/garage/driver/${payload.id}`
        );

        const { data } = resp;

        return data;
    } catch (err) {
        return false;
    }
};

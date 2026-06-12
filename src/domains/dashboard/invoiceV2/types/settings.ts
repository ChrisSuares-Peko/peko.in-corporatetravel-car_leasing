export type BusinessDetailsValues = {
    businessName?: string;
    address?: string;
    city?: string;
    state?: string;
    pincode?: string;
    phone: string;
    email?: string;
    gstNo?: string;
};

export type DocumentPrefixItem = {
    type: string;
    prefix: string;
};

export type GetSettingsResponse = {
    id: number;
    corporateUserId: number;
    businessName: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    phoneNumber: string;
    email: string;
    gstNo: string;
    logoUrl: string | null;
    signatureUrl: string | null;
    autoUpdateDocumentNumber: boolean;
    termsAndConditions: string;
    notes: string;
    documentNumberPrefix: DocumentPrefixItem[];
    createdAt: string;
    updatedAt: string;
};

export type DocumentSettingsValues = {
    autoUpdateDocNumber?: boolean;
    selectedDocumentType?: string;
    documentPrefixes?: Record<string, string>;
    termsAndConditions?: string;
    notes?: string;
    logo?: File | null;
    signature?: File | null;
    logoUrl?: string | null;
    signatureUrl?: string | null;
    removeLogo?: boolean;
    removeSignature?: boolean;
};

export type SettingsFormValues = BusinessDetailsValues & DocumentSettingsValues;

export type FilePayload = {
    file: string;
    format: string;
};

export type SaveSettingsPayload = {
    businessName: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    phoneNumber: string;
    email: string;
    gstNo?: string;
    autoUpdateDocumentNumber?: boolean;
    termsAndConditions?: string;
    notes?: string;
    logo?: FilePayload;
    signature?: FilePayload;
    documentPrefixes?: DocumentPrefixItem[];
    removeLogo?: boolean;
    removeSignature?: boolean;
};

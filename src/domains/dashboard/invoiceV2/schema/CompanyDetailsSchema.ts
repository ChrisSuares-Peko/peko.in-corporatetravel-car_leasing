import * as Yup from 'yup';

// update the schema as per the form fields and validation requirements
export const CompanyDetailsSchema = Yup.object().shape({
    communicationAddress: Yup.string().trim(),
    registeredAddress: Yup.string().trim(),
    settlementBankAccountDetails: Yup.string().trim(),
    proofOfRegisteredAddress: Yup.mixed().nullable(),
    localTaxIdentifier: Yup.mixed().nullable(),
    certificateOfIncorporation: Yup.mixed().nullable(),
    boardResolution: Yup.mixed().nullable(),
    beneficiaryOwnerInfo: Yup.mixed().nullable(),
    pciDssCertification: Yup.mixed().nullable(),
    settlementBankAccountProof: Yup.mixed().nullable(),
    lobSpecificDocument: Yup.mixed().nullable(),
    gstCertificate: Yup.mixed().nullable(),
});

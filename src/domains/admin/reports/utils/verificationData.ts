function getUnifiedSources(data: any, responseData: any) {
    return data || responseData?.orderResponse?.Result;
}

export const verificationConfigNew: Record<
    string,
    {
        fields: { label: string; key: string }[];
        getData: (data: any, responseData: any) => any;
        getValidityStatus?: (data: any, responseData: any) => string;
    }
> = {
    cin_verify: {
        fields: [
            { label: 'Company Name', key: 'company_name' },
            { label: 'Incorporation Date', key: 'incorporation_date' },

            {
                label: 'Address',
                key: 'director_details[0].address',
            },
            {
                label: 'Name',
                key: 'director_details[0].name',
            },
            {
                label: 'DOB',
                key: 'director_details[0].dob',
            },
            {
                label: 'Designation',
                key: 'director_details[0].designation',
            },
            { label: 'Registration Number', key: 'registration_number' },
        ],
        getData: (data, responseData) => data || responseData?.orderResponse?.Result, // Choose data or responseData
        getValidityStatus: (data, responseData) => {
            const src = getUnifiedSources(data, responseData);
            return ['VALID', 'SUCCESS'].includes((src?.status || '').toUpperCase())
                ? 'VALID'
                : 'INVALID';
        },
    },
    bank_account_verify: {
        fields: [
            { label: 'Name at Bank', key: 'name_at_bank' },
            { label: 'Account Status', key: 'account_status' },
            { label: 'Bank', key: 'bank_name' },
            { label: 'Branch', key: 'ifsc_details.branch' },
            { label: 'City', key: 'ifsc_details.city' },
            { label: 'Name Match Result', key: '"name_match_result' },
            // { label: 'Account Status Code', key: 'account_status_code' },
            // { label: 'IFSC Validity', key: 'account_status' },
        ],
        getData: (data, responseData) => data || responseData?.orderResponse?.Result,
        getValidityStatus: (data, responseData) => {
            const src = getUnifiedSources(data, responseData);
            return ['VALID', 'ACCOUNT_IS_VALID'].includes(
                src?.account_status || src?.account_status_code
            )
                ? 'VALID'
                : 'INVALID';
        },
    },
    pan_verify: {
        fields: [
            { label: 'Registered Name', key: 'registered_name' },
            { label: 'PAN Type', key: 'type' },
            { label: 'PAN Ref.ID', key: 'reference_id' },
            // { label: 'PAN Validity', key: 'valid' },
        ],
        getData: (data, responseData) => data || responseData?.orderResponse?.Result,
        getValidityStatus: (data, responseData) => {
            const src = getUnifiedSources(data, responseData);
            return src?.valid === true ? 'VALID' : 'INVALID';
        },
    },
    advance_pan_verify: {
        fields: [
            { label: 'Registered Name', key: 'registered_name' },
            { label: "Father's Name", key: 'father_name' },
            { label: 'PAN Type', key: 'type' },
            { label: 'Mobile Number', key: 'mobile_number' },
            { label: 'Email ID', key: 'email' },
            { label: 'Masked Aadhaar Number', key: 'masked_aadhaar_number' },
            { label: 'PAN Validity', key: 'status' },
        ],
        getData: (data, responseData) => data || responseData?.orderResponse?.Result,
        getValidityStatus: (data, responseData) => {
            const src = getUnifiedSources(data, responseData);
            return ['VALID', 'ACCOUNT_IS_VALID'].includes(src?.status || src?.status)
                ? 'VALID'
                : 'INVALID';
        },
    },
    ifsc_verify: {
        fields: [
            { label: 'Bank Name', key: 'bank' },
            { label: 'Branch Name', key: 'branch' },
            { label: 'Bank Address', key: 'address' },
            { label: 'City', key: 'city' },
            // { label: 'State', key: 'state' },
            // { label: 'Validity', key: 'status' },
        ],
        getData: (data, responseData) => data || responseData?.orderResponse?.Result,
        getValidityStatus: (data, responseData) => {
            const src = getUnifiedSources(data, responseData);
            return ['VALID', 'ACCOUNT_IS_VALID'].includes(src?.status || src?.status)
                ? 'VALID'
                : 'INVALID';
        },
    },
    voter_id_verify: {
        fields: [
            { label: 'Name', key: 'name' },
            { label: 'Name in Regional Language', key: 'name_in_regional_lang' },

            { label: "Father's Name", key: 'father_name' },
            { label: "Father's Name in Regional Language", key: 'relation_name_in_regional_lang' },

            { label: 'Age', key: 'age' },
            { label: 'Gender', key: 'gender' },
            { label: 'Address', key: 'address' },
            { label: 'State', key: 'state' },
            { label: 'DOB', key: 'dob' },
            { label: 'Assembly Constituency No.', key: 'assembly_constituency_number' },
            { label: 'Assembly Constituency', key: 'assembly_constituency' },
            { label: 'Parliamentary Constituency No.', key: 'parliamentary_constituency_number' },
            { label: 'Parliamentary Constituency', key: 'parliamentary_constituency' },
            { label: 'Part No.', key: 'part_number' },
            { label: 'Part Name', key: 'part_name' },
            { label: 'Polling Station', key: 'polling_station' },
        ],
        getData: (data, responseData) => data || responseData?.orderResponse?.Result,
        getValidityStatus: (data, responseData) => {
            const src = getUnifiedSources(data, responseData);
            return ['VALID', 'SUCCESS'].includes((src?.status || '').toUpperCase())
                ? 'VALID'
                : 'INVALID';
        },
    },
    passport_verify: {
        fields: [
            { label: 'Name on Passport', key: 'name' },
            { label: 'Type', key: 'application_type' },
            { label: 'Application Received Date', key: 'application_received_date' },

            // { label: 'Passport Status', key: 'status' },
        ],
        getData: (data, responseData) => data || responseData?.orderResponse?.Result,
        getValidityStatus: (data, responseData) => {
            const src = getUnifiedSources(data, responseData);
            return ['VALID', 'SUCCESS'].includes((src?.status || '').toUpperCase())
                ? 'VALID'
                : 'INVALID';
        },
    },
    gstin_verify: {
        fields: [
            { label: 'Legal Name', key: 'legal_name_of_business' },
            { label: 'Trade Name', key: 'trade_name_of_business' },
            { label: 'Registration Date', key: 'date_of_registration' },
            { label: 'Constitution of Business', key: 'constitution_of_business' },
            { label: 'GST Ref.ID', key: 'reference_id' },
            { label: 'GSTIN Status', key: 'gst_in_status' },
        ],
        getData: (data, responseData) => data || responseData?.orderResponse?.Result,
        getValidityStatus: (data, responseData) => {
            const src = getUnifiedSources(data, responseData);
            return src?.valid === true ? 'VALID' : 'INVALID';
        },
    },
    gstin_pan: {
        fields: [{ label: 'Status', key: 'status' }],
        getData: (data, responseData) => data || responseData?.orderResponse?.Result,
        getValidityStatus: (data, responseData) => {
            const src = getUnifiedSources(data, responseData);
            return ['VALID', 'SUCCESS'].includes((src?.status || '').toUpperCase())
                ? 'VALID'
                : 'INVALID';
        },
    },
    aadhar_verify: {
        fields: [
            { label: 'Full Name', key: 'name' },
            { label: 'Date of Birth', key: 'dob' },
            { label: 'Address', key: 'address' },
            { label: 'Gender', key: 'gender' },
            { label: 'Ref.ID', key: 'ref_id' },
            // { label: 'Aadhaar Verification Status', key: 'status' },
        ],
        getData: (data, responseData) => data || responseData?.orderResponse?.Result,
        getValidityStatus: (data, responseData) => {
            const src = getUnifiedSources(data, responseData);
            return ['VALID', 'SUCCESS'].includes((src?.status || '').toUpperCase())
                ? 'VALID'
                : 'INVALID';
        },
    },
    dl_verify: {
        fields: [
            { label: ' Driving License Number', key: 'dl_number' },
            { label: 'Date of Issue', key: 'details_of_driving_licence.date_of_issue' },
            { label: 'Full Name', key: 'details_of_driving_licence.name' },
            {
                label: 'Father’s / Husband’s Name',
                key: 'details_of_driving_licence.father_or_husband_name',
            },
            {
                label: 'Permanent Address',
                key: 'details_of_driving_licence.address_list[0].complete_address',
            },
            // {
            //     label: 'Temporary Address',
            //     key: 'details_of_driving_licence.address_list[1].complete_address',
            // },
            {
                label: 'Driving License Validity',
                key: 'dl_validity', // A new key for holding combined validity data
            },

            { label: 'License Status', key: 'status' },
        ],
        getData: (data, responseData) => {
            const validityData =
                responseData?.orderResponse?.Result?.details_of_driving_licence?.validity || {};

            // Construct validity info for transport and non_transport
            const validity = {
                non_transport: validityData?.non_transport
                    ? {
                          from: validityData?.non_transport?.from || 'N/A',
                          to: validityData?.non_transport?.to || 'N/A',
                      }
                    : null, // Use null if there's no validity data for non_transport
                transport: validityData?.transport
                    ? {
                          from: validityData?.transport?.from || 'N/A',
                          to: validityData?.transport?.to || 'N/A',
                      }
                    : null, // Use null if there's no validity data for transport
            };
         
            return {
                ...responseData?.orderResponse?.Result,
                details_of_driving_licence: {
                    ...responseData.orderResponse?.Result?.details_of_driving_licence,
                    validity, // Add combined validity information to the response
                },
            };
        },
        getValidityStatus: (data, responseData) => {
            const src = getUnifiedSources(data, responseData);
            return ['VALID', 'SUCCESS'].includes((src?.status || '').toUpperCase())
                ? 'VALID'
                : 'INVALID';
        },
    },
    aadhar_ocr_verify: {
        fields: [
            { label: ' Image', key: 'image_link' },
            { label: 'Ref.ID', key: 'reference_id' },
            // { label: 'Aadhar Verification Status', key: 'status' },
        ],
        getData: (data, responseData) => data || responseData?.orderResponse?.Result,
        getValidityStatus: (data, responseData) => {
            const src = getUnifiedSources(data, responseData);
            return ['VALID', 'SUCCESS'].includes((src?.status || '').toUpperCase())
                ? 'VALID'
                : 'INVALID';
        },
    },
    corporate_verify: {
        fields: [
            // { label: 'Company Name', key: 'company_name' },
            // { label: 'Address Type', key: 'addressType' },
        ],
        getData: (data, responseData) => data || responseData?.orderResponse?.Result, // Choose data or responseData
        getValidityStatus: (data, responseData) => {
            const src = getUnifiedSources(data, responseData);

            return src?.response[0]?.responseStatus === 'SUCCESS' ? 'VALID' : 'INVALID';
        },
    },
    director_verify_cin: {
        fields: [
            // { label: 'Company Name', key: 'company_name' },
            // { label: 'Address Type', key: 'addressType' },
        ],
        getData: (data, responseData) => data || responseData?.orderResponse?.Result, // Choose data or responseData
        getValidityStatus: (data, responseData) => {
            const src = getUnifiedSources(data, responseData);

            return src?.response[0]?.responseStatus === 'SUCCESS' ? 'VALID' : 'INVALID';
        },
    },
    director_verify_din: {
        fields: [
            // { label: 'Company Name', key: 'company_name' },
            // { label: 'Address Type', key: 'addressType' },
        ],
        getData: (data, responseData) => data || responseData?.orderResponse?.Result, // Choose data or responseData
        getValidityStatus: (data, responseData) => {
            const src = getUnifiedSources(data, responseData);

            return src?.response[0]?.responseStatus === 'SUCCESS' ? 'VALID' : 'INVALID';
        },
    },

    // Add more configs for other services if needed...
};

export const InputConfigNew: Record<
    string,
    {
        fields: { label: string; key: string }[];
        getData: (data: any, responseData: any) => any;
    }
> = {
    bank_account_verify: {
        fields: [
            { label: 'Bank Account Number', key: 'bank_account' },
            { label: 'IFSC Code', key: 'ifsc' },
            { label: 'Name Provided', key: 'name' },
            { label: 'Account Status Code', key: 'account_status_code' },
        ],
        getData: (data, responseData) =>
            // Extract account_status_code from responseData and other data from data
            ({
                ...responseData.orderResponse.InputDetails,
                account_status_code:
                    responseData?.orderResponse?.Result?.account_status_code || 'N/A', // Default value if not available
            }),
    },
    pan_verify: {
        fields: [
            { label: 'PAN ', key: 'pan' },
            { label: 'Name Provided', key: 'name' },
        ],
        getData: (data, responseData) => data || responseData?.orderResponse?.InputDetails,
    },
    advance_pan_verify: {
        fields: [
            { label: 'PAN ', key: 'pan' },
            { label: 'Name Provided', key: 'name' },
        ],
        getData: (data, responseData) => data || responseData?.orderResponse?.InputDetails,
    },
    ifsc_verify: {
        fields: [{ label: 'IFSC Code', key: 'ifsc' }],
        getData: (data, responseData) => data || responseData?.orderResponse?.InputDetails,
    },
    voter_id_verify: {
        fields: [
            { label: 'EPIC Number', key: 'epic_number' },
            { label: 'Provided Name', key: 'name' },
        ],
        getData: (data, responseData) => data || responseData?.orderResponse?.InputDetails,
    },
    dl_verify: {
        fields: [
            { label: ' Driving License Number', key: 'dl_number' },
            { label: 'DOB', key: 'dob' },
        ],
        getData: (data, responseData) => data || responseData?.orderResponse?.InputDetails,
    },
    passport_verify: {
        fields: [
            { label: 'File Number', key: 'file_number' },
            { label: 'DOB', key: 'dob' },
        ],
        getData: (data, responseData) => data || responseData?.orderResponse?.InputDetails,
    },
    gstin_verify: {
        fields: [
            { label: 'GSTIN', key: 'GSTIN' },
            { label: 'Name of Business', key: 'business_name' },
        ],
        getData: (data, responseData) => data || responseData?.orderResponse?.InputDetails,
    },
    gstin_pan: {
        fields: [{ label: 'PAN ', key: 'pan' }],
        getData: (data, responseData) => data || responseData?.orderResponse?.InputDetails,
    },
    aadhar_verify: {
        fields: [{ label: 'Aadhaar Number', key: 'aadhaar_number' }],
        getData: (data, responseData) => data || responseData?.orderResponse?.InputDetails,
    },
    cin_verify: {
        fields: [{ label: 'CIN', key: 'cin' }],
        getData: (data, responseData) => data || responseData?.orderResponse?.InputDetails,
    },
    corporate_verify: {
        fields: [{ label: 'CIN', key: 'cin' }],
        getData: (data, responseData) => data || responseData?.orderResponse?.InputDetails,
    },
    director_verify_cin: {
        fields: [{ label: 'CIN', key: 'CIN' }],
        getData: (data, responseData) => data || responseData?.orderResponse?.InputDetails,
    },
    director_verify_din: {
        fields: [{ label: 'DIN', key: 'DIN' }],
        getData: (data, responseData) => data || responseData?.orderResponse?.InputDetails,
    },

    // Add more configs for other services if needed...
};

import { type FC, useState } from 'react';

import { InboxOutlined } from '@ant-design/icons';
import { Upload, Typography, Flex, Spin } from 'antd';
import type { UploadProps } from 'antd';
import { useNavigate } from 'react-router-dom';

// import PdfThumbnail from '@components/molecular/pdfViewer/PdfThumbnail';
import { useAppDispatch } from '@src/hooks/store';
import { paths } from '@src/routes/paths';
import { showToast } from '@src/slices/apiSlice';

import { setESignDocData } from '../../slices/eSignDocSlice';

interface UploadFormProps {
    eSignAvailable: boolean;
}
const { Dragger } = Upload;

const UploadForm: FC<UploadFormProps> = ({ eSignAvailable }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const getBase64 = (file: File): Promise<string | null> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });

    const handleFile = async (file: File) => {
        if (!eSignAvailable) {
            dispatch(
                showToast({
                    description:
                        'Your eSign limit has been reached. The current available limit is 0. To continue, please consider upgrading your plan.',
                    variant: 'error',
                })
            );
            return false;
        }
        setLoading(true);
        const isPDF = file.type === 'application/pdf';
        if (!isPDF) {
            dispatch(
                showToast({ description: 'You can only upload PDF files.', variant: 'warning' })
            );
            setLoading(false);
            return false;
        }

        const isNonZeroFileSize = file.size > 0;
        if (!isNonZeroFileSize) {
            dispatch(
                showToast({ description: 'File size must be greater than 0 KB.', variant: 'error' })
            );
            setLoading(false);
            return false;
        }

        const isLt2M = file.size / 1024 / 1024 <= 20;
        if (!isLt2M) {
            dispatch(
                showToast({ description: 'File must be smaller than 20 MB.', variant: 'warning' })
            );
            setLoading(false);
            return false;
        }
        try {
            const base64Data = await getBase64(file);
            const fileNameWithoutExtension = file.name.substring(0, file.name.lastIndexOf('.'));
            // --for preview
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = e => {
                const newPdfUrl: any = e?.target?.result;
                dispatch(
                    setESignDocData({
                        docket_title: fileNameWithoutExtension,
                        documentBase64: base64Data || '',
                        document_url: newPdfUrl,
                        isDisabled: false,
                    })
                );

                navigate(`${paths.dashboard.eSign}/${paths.eSign.viewPage}`);
                setLoading(false);
            };
        } catch (error) {
            dispatch(
                showToast({
                    description: 'Something went wrong while uploading',
                    variant: 'warning',
                })
            );
            setLoading(false);
            return false;
        }
        return true;
    };

    const props: UploadProps = {
        name: 'file',
        multiple: false,
        maxCount: 1,
        showUploadList: false,
        accept: 'application/pdf',
        beforeUpload: async file => {
            const isValid = await handleFile(file);
            return !isValid ? Upload.LIST_IGNORE : false; // Prevent automatic upload
        },
        onDrop: async e => {
            const { files } = e.dataTransfer;
            if (files.length > 0) {
                const file = files[0];
                const isValid = await handleFile(file);
                if (!isValid) {
                    return Upload.LIST_IGNORE;
                }
            }
            return undefined;
        },
    };

    return (
        <Flex vertical className="mb-10">
            <Dragger {...props} className="bg-white w-full " style={{ minHeight: '12.2rem' }}>
                {loading && (
                    <Flex
                        justify="center"
                        align="center"
                        className="absolute inset-0 bg-white bg-opacity-75"
                    >
                        <Spin tip="Uploading..." />
                    </Flex>
                )}
                <Flex vertical className="mx-5 py-6">
                    <p className="ant-upload-drag-icon text-black">
                        <InboxOutlined />
                    </p>
                    <Typography.Text>Click or drag file to this area to upload</Typography.Text>
                    <Typography.Text className="text-gray-400 font-light">
                        Upload the document in PDF format (max 20 MB).
                    </Typography.Text>
                </Flex>
            </Dragger>
        </Flex>
    );
};

export default UploadForm;

import { SearchOutlined} from '@ant-design/icons';
import { Input,  Col } from 'antd';

import GenericTable from '@components/atomic/GenericTable';

import DownloadPayslipData from '../../hooks/dashboardHooks/useDownloadPayslip';
import { PayrollSlipTabProps } from '../../types/salaryProfileTypes/employeeSalaryTable';
import { payslipColumns } from '../../utils/salaryTable/data';






export default function PayrollSlipTab({ payslipData, tableLoading,eid }: PayrollSlipTabProps) {
    const {getPayslipDetails} = DownloadPayslipData()

    const handleDownload = async(year:string,month:string) => {
        await getPayslipDetails(eid,year,month,false)
    }
    return (
        <Col>
            <Input
                placeholder="Search"
                prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
                style={{ width: '100%', padding: '8px 12px', borderRadius: 8 }}
            />
            <GenericTable
                columns={payslipColumns(handleDownload)}
                dataSource={payslipData}
                loading={tableLoading}
                pagination={false}
            />
        </Col>
    );
}

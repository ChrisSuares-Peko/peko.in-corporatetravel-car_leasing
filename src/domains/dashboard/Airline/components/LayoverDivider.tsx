import { Divider, Typography } from 'antd';

import { formatDurationToHourMinute } from '../utils/formatDateCode';

interface Props {
    nextSegment: any;
}

const LayoverDivider = ({ nextSegment }: Props) => {
    if (!nextSegment) return null;

    const { GroundTime, Origin } = nextSegment;
    return (
        <Divider dashed className="w-full">
            <Typography.Text className="text-gray-400 text-sm font-normal w-full">
                {formatDurationToHourMinute(GroundTime)} Layover in {Origin.Airport.AirportName},{' '}
                {Origin.Airport.CountryName}
            </Typography.Text>
        </Divider>
    );
};

export default LayoverDivider;

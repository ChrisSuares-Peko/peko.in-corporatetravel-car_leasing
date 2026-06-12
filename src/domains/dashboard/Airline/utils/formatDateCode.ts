export function convertTimeFormat(duration: string) {
    const durationRegex = /^(\d+)([DHM])?(\d+)?([DHM])?(\d+)?([DHM])?$/;
    const match = duration.match(durationRegex);

    if (!match) {
        return 'Invalid input format';
    }

    let formattedDuration = '';

    if (match[1]) {
        formattedDuration += `${match[1]} `;
        if (match[2]) {
            formattedDuration += match[2] === 'D' ? 'd' : match[2].toLowerCase();
        }
    }

    if (match[3]) {
        formattedDuration += ` ${match[3]} `;
        if (match[4]) {
            formattedDuration += match[4] === 'H' ? 'hr' : match[4].toLowerCase();
        }
    }

    if (match[5]) {
        formattedDuration += ` ${match[5]} `;
        if (match[6]) {
            formattedDuration += match[6] === 'M' ? 'm' : match[6].toLowerCase();
        }
    }
    return formattedDuration.trim();
}

export function formatDurationToHourMinute(duration: number) {
    const hour = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hour} h ${minutes} m`;
}

export function calculateDuration(journey: any) {
    if (!journey) {
        return 0;
    }

    if (journey.length === 1) {
        return journey[0].Duration;
    }
    const lastJourney = journey[journey.length - 1];
    return lastJourney?.AccumulatedDuration || 0;
}

export function findCabilClass(num: 1 | 2 | 3 | 4 | 5 | 6) {
    const cabinClass = {
        1: 'All',
        2: 'Economy',
        3: 'PremiumEconomy',
        4: 'Business',
        5: 'PremiumBusiness',
        6: 'First',
    };

    return cabinClass[num] || '';
}

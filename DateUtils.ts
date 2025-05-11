import { format } from 'date-fns';

export function toIsoString(date: Date): String {
    return format(date, 'yyyy-MM-dd');
}

export function generateDaysBetween(start: Date, finish: Date): String[] {
    const dates: String[] = [];
    const current = new Date(start);
    const end = new Date(finish);

    current.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    while (current <= end) {
        dates.push(toIsoString(current));
        current.setDate(current.getDate() + 1);
    }

    return dates;
}
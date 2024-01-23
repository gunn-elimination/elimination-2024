import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

export const dateToRelative = (date: string) => {
	dayjs.extend(relativeTime);
	return dayjs(date).fromNow();
};

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/pt-br';

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.locale('pt-br');

export const formatDate = (date: Date | string | number, format = 'DD/MM/YYYY HH:mm') => {
  return dayjs(date).tz('America/Sao_Paulo').format(format);
};

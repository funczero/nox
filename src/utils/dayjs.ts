import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';
import 'dayjs/locale/pt-br.js';

dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.locale('pt-br');

dayjs.tz.setDefault('America/Sao_Paulo');

export default dayjs;
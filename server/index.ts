// Dependencies
// import '../client';

import { ffprobe } from '@/services/ffprobe';

const TEST_FILE_PATH =
  'E:\\Médiathèque\\Films\\Your Name. (2016) 2160p Bluray\\Your Name. (2016) 2160p Bluray.mkv';

ffprobe
  .getData(TEST_FILE_PATH)
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error(error);
  });

import { existsSync } from 'node:fs';

// The CV page and every link to it appear only once public/cv.pdf exists.
export const hasCv = existsSync('public/cv.pdf');

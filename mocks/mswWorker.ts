import { setupWorker } from "msw";

import { handles } from "./handles";

export const mswWorker = setupWorker(...handles);

import { setupServer } from "msw/node";

import { handles } from "./handles";

export const mswServer = setupServer(...handles);

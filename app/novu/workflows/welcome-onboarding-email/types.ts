import { z } from "zod";
import { inAppPayloadSchema, emailControlSchema } from "./schemas";

export type PayloadSchema = z.infer<typeof inAppPayloadSchema>;
export type ControlSchema = z.infer<typeof emailControlSchema>;

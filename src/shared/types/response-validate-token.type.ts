import { IPayload } from "../../users/domain/models/payload.interface";
import { ErrorResponse } from "../interfaces/error-response.interface";

export type ResponseValidateToken = IPayload | ErrorResponse;

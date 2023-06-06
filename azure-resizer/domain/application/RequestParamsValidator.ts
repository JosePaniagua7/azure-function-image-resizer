import { HttpRequest } from "@azure/functions";
import ImageResizerControlledExceptions from "../exceptions/ImageResizerControlledExceptions";

import { ValidationRule } from "../contracts/ValidationRule";

const hasTaskId: ValidationRule = {
    fn: (req: HttpRequest) => Boolean(req.params.id),
    error: ImageResizerControlledExceptions.missingTaskId()
}

const isTaskIdNumber: ValidationRule = {
    fn: (req: HttpRequest) => Boolean(Number(req.params.id)),
    error: ImageResizerControlledExceptions.invalidTaskId()
}
const hasDimensions: ValidationRule = {
    fn: (req: HttpRequest) => Boolean(req.query.dimensions),
    error: ImageResizerControlledExceptions.missingDimensions()
}

const isDimensionNumber: ValidationRule = {
    fn: (req: HttpRequest) => Boolean(Number(req.query.dimensions)),
    error: ImageResizerControlledExceptions.missingDimensions()
}


export const validateRequestParams = (req: HttpRequest): Boolean => {
    const rules: ValidationRule[] = [hasTaskId, isTaskIdNumber, hasDimensions, isDimensionNumber];
    const rejectedRules = rules.filter((rule: ValidationRule) => !rule.fn(req));
    if (rejectedRules.length) {
        const errorMessages = rejectedRules.map((rule: ValidationRule): string => rule.error.message);
        const errors = errorMessages.reduce((acc: string, current: string) => `${acc} ${current}`, '');
        throw ImageResizerControlledExceptions.invalidPayload(errors, errorMessages);
    }
    return true;
}
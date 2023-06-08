import { MultiparFile } from "../contracts/MultipartFile";
import { ValidationRule } from "../contracts/ValidationRule";
import ImageResizerControlledExceptions from "../exceptions/ImageResizerControlledExceptions";

const hasFiles: ValidationRule = {
  fn: (files: MultiparFile[]) => !(files.length === 0),
  error: ImageResizerControlledExceptions.notEnoughFiles(),
};

const hasLenghtOf1: ValidationRule = {
  fn: (files: MultiparFile[]) => files.length === 1,
  error: ImageResizerControlledExceptions.tooManyFiles(),
};

export const validateFiles = (files: MultiparFile[]): boolean => {
  const rules = [hasFiles, hasLenghtOf1];
  const rejectedRules = rules.filter((rule: ValidationRule) => !rule.fn(files));

  if (rejectedRules.length) {
    const errorMessages = rejectedRules.map(
      (rule: ValidationRule): string => rule.error.message
    );
    const errors = errorMessages.reduce(
      (acc: string, current: string) => `${acc} ${current}`,
      ""
    );
    throw ImageResizerControlledExceptions.invalidPayload(
      errors,
      errorMessages
    );
  }
  return true;
};

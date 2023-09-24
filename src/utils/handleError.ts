export class CustomError extends Error {
  constructor(message: string, fileName: string, lineNumber: number) {
    super(message);
    this.name = "CustomError";
    this.fileName = fileName;
    this.lineNumber = lineNumber;
  }

  // Additional properties to store file and line information
  fileName: string;
  lineNumber: number;
}

export function handleError(
  error: Error,
  fileName: string,
  lineNumber: number
) {
  if (error instanceof CustomError) {
    throw error;
  } else {
    throw new CustomError(error.message, fileName, lineNumber);
  }
}

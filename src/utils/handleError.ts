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

export function handleError(error: Error): void {
  if (error instanceof CustomError) {
    throw error;
    // Handle the error response as needed
  } else {
    throw new CustomError(
      error.message,
      getCurrentFileName(error),
      getCurrentLineNumber(error)
    );
  }
}

function getCurrentFileName(error: any): string {
  const stackLines = error.stack?.split("\n");
  if (stackLines && stackLines.length >= 4) {
    // Extract the file from the stack trace
    const callerLine = stackLines[3].trim();
    const match = /\((.*?):(\d+):\d+\)/.exec(callerLine);
    if (match && match.length === 3) {
      const [, file] = match;
      return file;
    }
  }
  return "File information not available";
}

function getCurrentLineNumber(error: any): number {
  const stackLines = error.stack?.split("\n");
  // if (stackLines && stackLines.length >= 4) {
  //   // Extract the line number from the stack trace
  //   const callerLine = stackLines[3].trim();
  //   const match = /\((.*?):(\d+):\d+\)/.exec(callerLine);
  //   if (match && match.length === 3) {
  //     const [, , line] = match;
  //     return parseInt(line, 10);
  //   }
  // }

  const lineOfError = stackLines[0];
}

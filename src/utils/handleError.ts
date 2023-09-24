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
  try {
    throw error;
  } catch (e: any) {
    if (e instanceof CustomError) {
      console.error(
        `Custom Error: ${e.message}, File: ${e.fileName}, Line: ${e.lineNumber}`
      );
      // Handle the error response as needed
    } else {
      throw new CustomError(
        e.message,
        getCurrentFileName(),
        getCurrentLineNumber()
      );
    }
  }
}

function getCurrentFileName(): string {
  try {
    throw new Error();
  } catch (error: any) {
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
  }
  return "File information not available";
}

function getCurrentLineNumber(): number {
  try {
    throw new Error();
  } catch (error: any) {
    const stackLines = error.stack?.split("\n");
    if (stackLines && stackLines.length >= 4) {
      // Extract the line number from the stack trace
      const callerLine = stackLines[3].trim();
      const match = /\((.*?):(\d+):\d+\)/.exec(callerLine);
      if (match && match.length === 3) {
        const [, , line] = match;
        return parseInt(line, 10);
      }
    }
  }
  return -1; // Line number information not available
}

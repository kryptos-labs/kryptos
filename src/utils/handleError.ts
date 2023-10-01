export class CustomError extends Error {
  constructor(message: string, fileName: string, lineNumber: string) {
    super(message);
    this.name = "CustomError";
    this.fileName = fileName;
    this.lineNumber = lineNumber;
  }

  // Additional properties to store file and line information
  fileName: string;
  lineNumber: string;
}

export function handleError(error: any): void {
  if (error instanceof CustomError) {
    throw error;
    // Handle the error response as needed
  } else {
    throw new CustomError(
      error.message,
      getCurrentFileName(error),
      getCurrentLineNumber(error)
    );

    //print  line number and message
    // console.log(getCurrentLineNumber(error) + " " + error.message);
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

function getCurrentLineNumber(error: any): string {
  if (error instanceof Error) {
    const stackLines = error.stack?.split("\n");
    let stackLine: string = "-1";
    if (stackLines && stackLines.length >= 2) {
      // The second line of the stack trace typically contains the file name and line number
      stackLine = stackLines[1].trim();
    }

    return stackLine;
  } else return "-1";
}

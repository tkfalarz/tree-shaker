type AnalyzerOptions = {
    entry: string;
    reportDir: string;
    acceptableThreshold: number;
}

export const analyzeBundle = (options: AnalyzerOptions) => {
    console.log("Analyzing bundle at:", options.entry);
    console.log("Saving reports to:", options.reportDir);
    console.log("Acceptable tree shaking threshold:", options.acceptableThreshold, "%");
    
    
    // Simulate analysis logic
    console.log("Your bundle tree shakes in 82%");
}
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { analyzeTreeShaking } from "./bundle-analysis";

const args = yargs(hideBin(process.argv))
  .option("entry", {
    alias: "e",
    type: "string",
    description: "Path to the file to analyze",
    demandOption: true,
  })
  .option("reportDir", {
    alias: "d",
    type: "string",
    description: "Directory to save the reports",
    default: "./tree-shaker-reports",
  })
  .option("acceptableThreshold", {
    alias: "t",
    coerce: (value: number) => {
        if (value < 0 || value > 100) {
            throw new Error("acceptableThreshold must be a percentage between 0 and 100.");
        }
        return value;
    },
    type: "number",
    description: "What percentage of tree shaking is acceptable",
    default: 0,
  })
  .parseSync();

analyzeTreeShaking({
  file: args.entry,
  logDictPath: args.reportDir,
  minOptimization: args.acceptableThreshold,
});

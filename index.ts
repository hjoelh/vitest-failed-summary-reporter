export class failedSummary {
  async onFinished(files: any) {
    setTimeout(() => {
      // timeout because its the only way I can get it too print AFTER  other reporters
      console.log("\n");

      const fails = files?.filter((f: any) => f.result.state === "fail");

      fails?.forEach((f: any) => {
        const tests = findAndTransformFailedTests(f.tasks);
        const suites = findAndTransformFailedTests(
          f?.tasks
            ?.filter((t: any) => t?.type === "suite") // describe blocks
            ?.filter((t: any) => t?.result?.state === "fail")
            ?.flatMap((e: any) => e?.tasks)
        );

        console.log(
          `${red}Failed: ${f.name}${resetColor} \n${[...tests, ...suites].join(
            "\n"
          )}`
        );

        console.log("\n");
      });
    }, 250);
  }
}

const findAndTransformFailedTests = (x: any[]) => {
  return x
    ?.filter((t: any) => t?.type === "test")
    ?.filter((t: any) => t?.result?.state === "fail")
    ?.map((t: any) => " ".repeat(5) + " - " + t.name);
};

const red = "\x1b[31m";
const resetColor = "\x1b[0m";

const { spawnSync } = require("child_process");

const options = require("../cucumber"); // Import configuration from cucumber.js

const [, , environment, device] = process.argv;

console.log("Environment", environment);
console.log("Device", device);

// Environment variables setup
process.env.ENV_VAR_ENV = environment;
process.env.ENV_VAR_DEVICE = device;

// Test execution command
const command = `npx cucumber-js ${options.test_runner} & node ./htmlReportGenerator.js`;

try {
    // Console logs command
    const result = spawnSync(command, { stdio: "inherit", shell: true });

    // Checking ther execution finalising code
    if (result.status !== 0) {
        console.error(`Tests failed with code ${result.status}`);
        process.exit(1);
    } else {
        console.log("Tests completed successfully");
    
    }
} catch (error) {
    console.error("Error executing tests: ", error);
    process.exit(1);
}
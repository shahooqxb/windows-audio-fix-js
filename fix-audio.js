
---

## ✅ fix-audio.js (COPY–PASTE EVERYTHING)

```javascript
/**
 * Windows Audio Fix Script
 * JavaScript (Node.js)
 *
 * Run terminal as ADMINISTRATOR
 */

const { execSync } = require("child_process");

function run(command) {
  console.log("\n> " + command);
  try {
    execSync(command, { stdio: "inherit" });
  } catch (err) {
    console.log("Command failed, continuing...");
  }
}

console.log("=== WINDOWS AUDIO FIX SCRIPT ===");

// METHOD 1: Restart Audio Services
run("net stop audiosrv");
run("net stop AudioEndpointBuilder");
run("net start AudioEndpointBuilder");
run("net start audiosrv");

// METHOD 2: Scan for Audio Devices
run("pnputil /scan-devices");

// METHOD 3: Reinstall Audio Driver
run(
  'powershell -Command "Get-PnpDevice -Class Sound,VideoAndGameControllers | Disable-PnpDevice -Confirm:$false"'
);
run(
  'powershell -Command "Get-PnpDevice -Class Sound,VideoAndGameControllers | Enable-PnpDevice -Confirm:$false"'
);

// METHOD 4: Repair System Files
run("sfc /scannow");
run("DISM /Online /Cleanup-Image /RestoreHealth");

// METHOD 5: Reset Audio Registry
run(
  'reg delete "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\MMDevices\\Audio" /f'
);

console.log("\n=== DONE ===");
console.log("PLEASE RESTART YOUR PC");

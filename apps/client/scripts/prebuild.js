const fs = require("fs");

if (process.env.CI === "1") {
  const reactAppEnvs = Object.fromEntries(
    Object.entries(process.env).filter((i) => i[0].startsWith("REACT_APP_"))
  );

  let envFile = ``;
  for (const [key, value] of Object.entries(reactAppEnvs)) {
    envFile += `${key}="${value}"\n`;
  }

  fs.writeFileSync(".env.production.local", envFile, "utf-8");
}

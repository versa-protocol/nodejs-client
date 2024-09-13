import path from "path";
import webpack from "webpack";

export default function ({ service, prod }: { service: string; prod: string }) {
  if (service !== "receiver" && service !== "sender") {
    throw new Error("Invalid service name");
  }
  const mode = prod === "true" ? "production" : "development";
  const config: webpack.Configuration = {
    target: "node",
    entry: `./src/index.${service}.ts`,
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".js"],
    },
    mode,
  };

  return config;
}

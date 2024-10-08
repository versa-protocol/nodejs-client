import { PackageJson, ServiceInfo } from "../models/meta";
import { Express, Request, Response } from "express";
import packageJson from "../../package.json";

const packageInfo: PackageJson = packageJson;

export const configure = (
  app: Express,
  serviceVariant: "receiver" | "sender",
) => {
  app.get("/", (_req: Request, res: Response) => {
    const info: ServiceInfo = {
      service_name: packageInfo.name + "-" + serviceVariant,
      service_version: packageInfo.version,
    };
    res.json(info);
  });
};

import { PackageJson, ServiceInfo } from './models';
import express, { Request, Response } from 'express';
import packageJson from '../package.json';

const packageInfo: PackageJson = packageJson;
const PORT: number = 8080;

const app = express();

app.get('/', (req: Request, res: Response) => {
  const info: ServiceInfo = {
    service_name: packageInfo.name,
    service_version: packageInfo.version,
  }
  res.json(info);
});

app.listen(PORT, () => {
  console.log(`Service listening at http://localhost:${PORT}`);
});

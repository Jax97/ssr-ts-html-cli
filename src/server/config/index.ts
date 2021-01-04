import { extend } from 'lodash';
import { join } from 'path';
type config = {
  port: number;
  viewDIR: string;
};

let config: config = {
  port: 8000,
  viewDIR: join(__dirname, 'views'),
};

if (process.env.NODE_ENV == 'development') {
  const localConfig = {
    port: 8081,
  };
  config = extend(config, localConfig);
}

if (process.env.NODE_ENV == 'production') {
  const prodConfig = {
    port: 8080,
  };
  config = extend(config, prodConfig);
}

export default config;

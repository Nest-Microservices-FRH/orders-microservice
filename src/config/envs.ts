import 'dotenv/config';
import * as joi from 'joi';
import { Dialect } from 'sequelize';

interface EnvVars {
  PORT: number;
  DIALECT: Dialect;
  DB_HOST: string;
  DB_PORT: number;
  DB_NAME: string;
  DB_USER: string;
  DB_PASSWORD: string;
  LOGGING: boolean;
  DB_SYNCHRONIZE: boolean;
  DB_AUTOLOADMODELS: boolean;
  PRODUCTS_MS_HOST: string;
  PRODUCTS_MS_PORT: number;
}

const envsSchema = joi
    .object({
        PORT             : joi.number().required(),
        DIALECT          : joi.string().required(),
        DB_HOST          : joi.string().required(),
        DB_PORT          : joi.number().required(),
        DB_NAME          : joi.string().required(),
        DB_USER          : joi.string().required(),
        DB_PASSWORD      : joi.string().required(),
        LOGGING          : joi.boolean().required(),
        DB_SYNCHRONIZE   : joi.boolean().required(),
        DB_AUTOLOADMODELS: joi.boolean().required(),
        PRODUCTS_MS_HOST : joi.string().required(),
        PRODUCTS_MS_PORT : joi.number().required(),
    })
    .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
    port          : envVars.PORT,
    dialect       : envVars.DIALECT,
    dbHost        : envVars.DB_HOST,
    dbPort        : envVars.DB_PORT,
    dbName        : envVars.DB_NAME,
    dbUser        : envVars.DB_USER,
    dbPassword    : envVars.DB_PASSWORD,
    logging       : envVars.LOGGING,
    synchronize   : envVars.DB_SYNCHRONIZE,
    autoLoadModels: envVars.DB_AUTOLOADMODELS,
    productsMsHost: envVars.PRODUCTS_MS_HOST,
    productsMsPort: envVars.PRODUCTS_MS_PORT,
};

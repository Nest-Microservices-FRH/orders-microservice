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
  NATS_SERVERS: string[];
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
        NATS_SERVERS     : joi.array().items(joi.string()).required(),
    })
    .unknown(true);

const { error, value } = envsSchema.validate({
    ...process.env,
    NATS_SERVERS: process.env.NATS_SERVERS?.split(','), // split NATS_SERVERS by comma
});

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
    natsServers   : envVars.NATS_SERVERS,
};

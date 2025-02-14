import mongoose from 'mongoose';
import buildSchema from '../mongoose/buildSchema';
import { SanitizedConfig } from '../config/types';

const buildModel = (config: SanitizedConfig): mongoose.Model<any> | null => {
  if (config.globals && config.globals.length > 0) {
    const globalsSchema = new mongoose.Schema({}, { discriminatorKey: 'globalType', timestamps: true });

    const Globals = mongoose.model('globals', globalsSchema);

    Object.values(config.globals).forEach((globalConfig) => {
      const globalSchema = buildSchema(config, globalConfig.fields, { global: true });
      Globals.discriminator(globalConfig.slug, globalSchema);
    });

    return Globals;
  }

  return null;
};

export default buildModel;

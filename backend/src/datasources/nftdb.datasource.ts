import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'nftdb',
  connector: 'mongodb',
  url: process.env.MONGODB_URL,
  host: process.env.MONGODB_HOST,
  port: process.env.MONGODB_PORT,
  user: process.env.MONGODB_USER,
  password: process.env.MONGODB_PASSWORD,
  database: process.env.MONGODB_DATABASE,
  useNewUrlParser: true
};
// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class NftdbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'nftdb';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.nftdb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}

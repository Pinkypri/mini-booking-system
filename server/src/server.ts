import app from './app';
import AppDataSource from './config/database';
import env from './config/env';
import logger from './utils/logger';

const PORT = env.PORT;

AppDataSource.initialize()
  .then(() => {
    logger.info('Database connected successfully');
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  })
  .catch(error => {
    logger.error('Database connection failed:', error);
    process.exit(1);
  });
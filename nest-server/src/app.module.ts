/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersController } from './orders/orders.controller';
import { OrdersService } from './orders/orders.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { ElasticsearchConfigModule } from './elasticsearch.module';

@Module({
  imports: [
    //ElasticsearchConfigModule
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env${process.env.NODE_ENV === 'production' ? '.production' : ''}`,
    }),
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        node: configService.get<string>('ELASTICSEARCH_HOST'),
        auth: {
            username: configService.get<string>('ELASTICSEARCH_USERNAME') || '',
            password: configService.get<string>('ELASTICSEARCH_PASSWORD') || '',
        },
        tls: {
          rejectUnauthorized: false, // השבתת בדיקת SSL
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController, OrdersController],
  providers: [AppService, OrdersService],
})
export class AppModule { }

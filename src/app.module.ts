import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './post/post.module';
import { ReviewModule } from './review/review.module';
import { ProductModule } from './product/product.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UserModule, PostModule, ReviewModule, ProductModule, FileModule],
})
export class AppModule {}

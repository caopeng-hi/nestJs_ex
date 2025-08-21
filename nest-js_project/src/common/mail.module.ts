import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import {HandlebarsAdapter} from '@nestjs-modules/mailer/dist/adapter/handlebars/adapter'
@Module({
    imports: [
        MailerModule.forRoot({
            transport: 'smtps://user@domain.com"pass@smtp.domain.com',
            defaults: {
                from :'"nest-modules" <modules@nestjs.com>'
            },
            template: {
                dir: __dirname + '/templates',
                adapter: new HandlebarsAdapter(),
                options: {
                    strict:true
                }
            }
        })
    ]
})
export class MailModule {}

import { Module } from '@nestjs/common';
import { MongooseModule} from '@nestjs/mongoose';
import { InstController} from './instruments.controller';
import { InstService } from './instruments.service';
import { InstSchema } from './instruments.model';

@Module({
    imports: [MongooseModule.forFeature([{name: 'Instrument', schema: InstSchema }])],
    controllers: [InstController],
    providers: [InstService],
})
export class InstModule{}
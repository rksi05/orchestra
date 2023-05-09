import { Injectable, NotFoundException, SerializeOptions } from '@nestjs/common';
import { Instrument } from './instruments.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class InstService {

    constructor(@InjectModel('Instrument') private readonly instModel: Model<Instrument>) {}

    async getAllInstrument() {
        const inst = await this.instModel.find().exec();
        return inst.map(c => ({ id: c.id, 
            instrument: c.instrument,
            rating: c.rating,
            description: c.description,
            solos: c.solos,
            pros: c.pros,
            sound: c.sound
        }));
    }

    async insertInstrument(instrument: string, rating:string, description: string, solos: string, pros:string, sound:string) {
        const newInst = new this.instModel({ instrument: instrument, rating : rating, description: description, solos: solos, pros: pros, sound: sound });
        const result = await newInst.save();
        return result.id as string;
    }

    async getInstrumentById(instId: string) {
        const inst = await (await this.findInstrument(instId));
        return { instrument: inst.instrument, rating: inst.rating, description: inst.description, solos: inst.solos, pros: inst.pros, sound: inst.sound };
    }

    async deleteInstrumentByName(instName: string) {
        const result = await this.instModel.deleteOne({ name: instName }).exec();
        if (result.deletedCount === 0) {
            throw new NotFoundException('product does not exist');
        }

    }

    private async findInstrument(instId: string): Promise<Instrument> {
        let char;
        try {
            char = await this.instModel.findById(instId)

        } catch (error) {
            throw new NotFoundException('product does not exist');

        }
        if (!char) {
            throw new NotFoundException('product does not exist');
        }
        return char;
    }
}
import { Controller, Post, Patch, Delete, Body, Get, Param } from '@nestjs/common';
import { InstService } from './instruments.service';

@Controller('instruments')
export class InstController {
    constructor(private readonly instService: InstService) { }
    
    @Get()
    async getAllInstrument() {
        const inst = await this.instService.getAllInstrument();
        return inst;
    }

    @Post()
    async addInstrument(
        @Body('instrument') instName: string, 
        @Body('rating') instRating: string,
        @Body('description') instDescription: string, 
        @Body('solos') instSolos: string, 
        @Body('pros') instPros: string,
        @Body('sound') instSound: string,
        ) {

        const generatedId = await this.instService.insertInstrument(instName, instRating, instDescription, instSolos, instPros, instSound);
        return { id: generatedId };
    }

    @Get(':id')
    async getInstrumentById(@Param('id') instId: string,) {
        const inst  = await this.instService.getInstrumentById(instId);
        return inst;
    }

    @Delete(':name')
    async deleteInstrumentByName(@Param('name') instName: string,) {
        await this.instService.deleteInstrumentByName(instName);
        return null;
    }

}
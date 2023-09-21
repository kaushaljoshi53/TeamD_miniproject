import { Request, Response } from 'express';
import hasNullValues from '../utils/hasNullValues';
import eventValidation from '../utils/eventsDataValidation';
import Event from '../models/events';
import { Op } from 'sequelize';

class EventController {

    public async addEvent(req: Request, res: Response) {
        try {
            const data = req.body;
            console.log(data);
            
            if (hasNullValues(data)){
                return res.status(209).json({message:"All Fields Should Be Filled."})
            }
            if (!eventValidation.isValidDateFormat(data.eventDate)) {
                return res.status(209).json({message:"Wrong Date Input"});
            }
            if ((!eventValidation.isValidTime(data.startTime))||(!eventValidation.isValidTime(data.endTime))){
                return res.status(209).json({message:"Wrong Input Time"});
            }
            if (!eventValidation.isStartTimeBeforeEndTime(data.startTime,data.endTime)){
                return res.status(209).json({message:"Wrong Times"})
            }
            const eventExists = await Event.findOne({where:{eventName: data.eventName}});
            const overLappingEvents = await Event.findOne({
                where:{
                    eventDate: data.eventDate,
                    [Op.or]: [
                        {
                            [Op.and]:[
                                {startTime: {[Op.lte]: data.startTime}},
                                { endTime: {[Op.gte]: data.startTime}},
                            ]
                        },
                        {
                            [Op.and]:[
                                {startTime: {[Op.lte]: data.endTime}},
                                { endTime: {[Op.gte]: data.startTime}},
                            ]
                        },
                        {
                            [Op.and]:[
                                {startTime: {[Op.lte]: data.endTime}},
                                { endTime: {[Op.gte]: data.endTime}},
                            ]
                        },
                    ]
                }
            });

            if (!!eventExists){
                return res.status(209).json({message:"Event Already Exists"});
            }
            if(!!overLappingEvents){
                return res.status(209).json({message:"Time Clashed With Other Events"});
            }

            const create = await Event.create(data);

            if (create){
                return res.status(201).json({message: "Event Added Succesfully"});
            }
            else{
                return res.status(401).json({message: "Event Not Added"});
            }

        } catch (error) {
            console.error(error);
            return res.status(500).json({message: "Some Problem Occured"});
        }
    }
}


export default EventController;
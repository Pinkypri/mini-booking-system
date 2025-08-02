import { Slot } from '../models/Slot';
import AppDataSource from '../config/database';
import { ISlotCreate, ISlotResponse } from '../interfaces/slot.interface';
import logger from '../utils/logger';
import { v4 as uuidv4 } from 'uuid';

const slotRepository = AppDataSource.getRepository(Slot);

export const createSlot = async (slotData: ISlotCreate): Promise<ISlotResponse> => {
  try {
    const ucode = uuidv4();
    const slot = slotRepository.create({
 
      ...slotData,
      bookedSeats: slotData.bookedSeats || 0,
      isAvailable: slotData.isAvailable !== undefined ? slotData.isAvailable : true,
      slot_ucode: ucode,
    });
    await slotRepository.save(slot);
    return slot;
  } catch (error) {
    logger.error('Error in createSlot service:', error);
    throw error;
  }
};

interface SlotFilterParams {
  startDate?: Date;
  endDate?: Date;
  venue?: string;
  title?: string;
  minPrice?: number;
  maxPrice?: number;
}

export const getAvailableSlots = async (filters: SlotFilterParams = {}): Promise<ISlotResponse[]> => {
  try {
    const queryBuilder = slotRepository.createQueryBuilder('slot');

    queryBuilder.where('slot.isAvailable = :isAvailable', { isAvailable: true });

    if (filters.startDate) {
      queryBuilder.andWhere('slot.startTime >= :startDate', { startDate: filters.startDate });
    }

    if (filters.endDate) {
      queryBuilder.andWhere('slot.startTime <= :endDate', { endDate: filters.endDate });
    }

    if (filters.venue) {
      queryBuilder.andWhere('slot.venue ILIKE :venue', { venue: `%${filters.venue}%` });
    }

    if (filters.title) {
      queryBuilder.andWhere('slot.title ILIKE :title', { title: `%${filters.title}%` });
    }

    if (filters.minPrice !== undefined) {
      queryBuilder.andWhere('slot.price >= :minPrice', { minPrice: filters.minPrice });
    }

    if (filters.maxPrice !== undefined) {
      queryBuilder.andWhere('slot.price <= :maxPrice', { maxPrice: filters.maxPrice });
    }

    const slots = await queryBuilder.getMany();
    return slots;
  } catch (error) {
    logger.error('Error in getAvailableSlots service:', error);
    throw error;
  }
};



import { ApiError } from '../../utils/ApiError.js';
import { Material } from '../materials/material.model.js';
import { Report } from './report.model.js';

export async function getAllReportsService(page, limit) {
    try {
        limit = parseInt(limit) || 10;
        page = parseInt(page) || 1;
        const skip = (page - 1) * limit;

        const reports = await Report.find().skip(skip).limit(limit).lean();

        if (!reports) throw new ApiError('No reports found!');

        return reports;
    } catch (error) {
        if (error instanceof ApiError) throw error;
        throw new ApiError(error.message, 500);
    }
}

export async function makeReportService(title, description, materialId, user) {
    try {
        if (!title && !materialId)
            throw new ApiError('Title and Refrence Material is required', 401);
        if (!user) throw new ApiError('Something went south!', 500);
        const material = await Material.findById(materialId);

        if (!material)
            throw new ApiError('No material found please try again!', 401);

        const payload = {
            title,
            description,
            madeTo: materialId,
            madeBy: user._id,
        };
        const result = await Report.create(payload);

        if (!result)
            throw new ApiError('Something went South while reporting', 500);

        return result;
    } catch (error) {
        if (error instanceof ApiError) throw error;
        throw new ApiError(error.message, 500);
    }
}

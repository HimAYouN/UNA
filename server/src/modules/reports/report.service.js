import { ApiError } from "../../utils/ApiError.js";
import { Report } from "./report.model.js";

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

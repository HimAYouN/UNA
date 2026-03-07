import { getAllReportsService } from "./report.service.js";

export async function getAllReports(req, res, next) {
    try {
        const { page, limit } = req.query;
        const result = await getAllReportsService();
        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

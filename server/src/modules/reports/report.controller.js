import { getAllReportsService, makeReportService } from "./report.service.js";

export async function getAllReports(req, res, next) {
    try {
        const { page, limit } = req.query;
        const result = await getAllReportsService();
        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

export async function makeReport(req, res, next) {
    try {
        const {title, description, materialId} = req.body
        const user = req.user
        const result = await makeReportService(title, description, materialId, user);
        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

import express from "express";
import {
  getAdminLeads,
  getAdminLeadById,
  updateAdminLeadStatus,
  getLeadLogs,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/leads", getAdminLeads);
router.get("/leads/:id", getAdminLeadById);
router.patch("/leads/:id/status", updateAdminLeadStatus);
router.get("/leads/:id/logs", getLeadLogs);

export default router;

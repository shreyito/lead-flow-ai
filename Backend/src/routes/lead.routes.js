import express from "express";
import {
  createLead,
  getLeads,
  updateLeadStatus,
} from "../controllers/lead.controller.js";

const router = express.Router();

router.post("/", createLead);
router.get("/", getLeads);
router.patch("/:id/status", updateLeadStatus);

export default router;

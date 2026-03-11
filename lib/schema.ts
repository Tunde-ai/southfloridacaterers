import { z } from "zod";

export const inquirySchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  eventType: z.string().min(1, "Please select an event type"),
  serviceType: z.string().min(1, "Please select a service type"),
  eventDate: z.string().min(1, "Please select an event date"),
  headcount: z.string().min(1, "Please select estimated headcount"),
  deliveryZip: z.string().optional(),
  budget: z.string().optional(),
  notes: z.string().optional(),
});

export type InquiryFormData = z.infer<typeof inquirySchema>;

export const eventTypes = [
  "Wedding",
  "Funeral / Repast",
  "Corporate Lunch",
  "Birthday Party",
  "Private Gathering",
  "Other",
] as const;

export const serviceTypes = [
  "Pickup",
  "Drop-Off Delivery",
  "Full Service",
  "Full Event + DJ",
  "Not Sure",
] as const;

export const headcountOptions = [
  "Under 25",
  "25–50",
  "50–80",
  "80–115",
  "115–200",
  "200+",
] as const;

export const budgetOptions = [
  "Under $300",
  "$300–$600",
  "$600–$1,000",
  "$1,000–$2,500",
  "$2,500+",
] as const;

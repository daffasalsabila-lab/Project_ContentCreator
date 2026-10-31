
import Joi from "joi";

export const createContentSchema = Joi.object({
    channels_id: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            "number.base": "Channel ID must be a number",
            "number.integer": "Channel ID must be an integer",
            "number.positive": "Channel ID must be greater than zero",
            "any.required": "Channel ID is required",
        }),

    title: Joi.string()
        .trim()
        .min(1)
        .required()
        .messages({
            "string.empty": "Title is required",
            "any.required": "Title is required",
        }),

    description: Joi.string()
        .allow("", null)
        .optional(),

    script_draft: Joi.string()
        .allow("", null)
        .optional(),

    format_type: Joi.string()
        .valid(
            "short_video",
            "long_video",
            "carousel",
            "single_post"
        )
        .required()
        .messages({
            "any.only": "Invalid content format",
            "any.required": "Format type is required",
        }),

    priority: Joi.string()
        .valid("low", "medium", "high")
        .default("medium")
        .messages({
            "any.only": "Invalid priority",
        }),

    scheduled_date: Joi.date()
        .iso()
        .allow(null)
        .optional()
});

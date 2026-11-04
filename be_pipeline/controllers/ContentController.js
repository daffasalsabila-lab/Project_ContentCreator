import pool from "../config/db.js";
import { createContentSchema } from "../validations/createContentValidation.js";

export const getAllContents = async (req, res) => {
  try {
    const userId = req.user.id;
    const ownerColumn = req.user.role === "editor" ? "editor_id" : "user_id";
    const { status, channels_id } = req.query;

    let sql = `SELECT id, user_id, editor_id, channels_id, title, description, script_draft, format_type, status, priority, scheduled_date, published_date, published_url, review_url, editing_url, created_at, updated_at FROM contents WHERE ${ownerColumn} = ?`;

    const params = [userId];

    if (status) {
      const allowedStatus = [
        "idea",
        "scripting",
        "recording",
        "editing",
        "ready",
        "published",
      ];

      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          status: false,
          message: "Invalid content status",
        });
      }

      sql += " AND status = ?";
      params.push(status);
    }

    if (channels_id) {
      if (!/^[1-9]\d*$/.test(channels_id)) {
        return res.status(400).json({
          status: false,
          message: "Invalid channel ID",
        });
      }
      sql += " AND channels_id = ?";
      params.push(channels_id);
    }

    sql += " ORDER BY id DESC";

    const [contents] = await pool.query(sql, params);

    return res.status(200).json({
      status: true,
      message: "Contents retrieved successfully",
      data: contents,
    });
  } catch (error) {
    console.error("Get contents error:", error.message);

    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

export const getContentsById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const userId = req.user.id;
    const ownerColumn = req.user.role === "editor" ? "editor_id" : "user_id";

    // Validasi ID
    if (!Number.isSafeInteger(id) || id <= 0) {
      return res.status(400).json({
        status: false,
        message: "Invalid content ID",
      });
    }

    // Ambil content milik user yang sedang login
    const [contents] = await pool.query(
      `SELECT *
             FROM contents
             WHERE id = ? AND ${ownerColumn} = ?`,
      [id, userId],
    );

    if (contents.length === 0) {
      return res.status(404).json({
        status: false,
        message: "Content not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Content retrieved successfully",
      data: contents[0],
    });
  } catch (error) {
    console.error("Get contents by ID error:", error.message);

    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

export const createContents = async (req, res) => {
  try {
    const { error, value } = createContentSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        status: false,
        message: error.details[0].message,
      });
    }

    const userId = req.user.id;
    const { editor_id } = value;

    if (req.user.role !== "creator" && editor_id != null) {
      return res.status(403).json({
        status: false,
        message: "Only creators can assign an editor",
      });
    }

    if (editor_id != null) {
      const [editors] = await pool.query(
        "SELECT id FROM users WHERE id = ? AND role = 'editor'",
        [editor_id],
      );
      if (editors.length === 0) {
        return res.status(400).json({
          status: false,
          message: "Selected editor is not valid",
        });
      }
    }

    const {
      channels_id,
      title,
      description,
      script_draft,
      format_type,
      priority,
      scheduled_date,
    } = value;

    const [channels] = await pool.query(
      "SELECT id FROM channels WHERE id = ? AND user_id = ?",
      [channels_id, userId],
    );

    if (!channels.length) {
      return res.status(404).json({
        status: false,
        message: "Channel not found",
      });
    }

    const [result] = await pool.query(
      `INSERT INTO contents
            (user_id, editor_id, channels_id, title, description, script_draft,
             format_type, status, priority, scheduled_date)
            VALUES (?, ?, ?, ?, ?, ?, ?, 'idea', ?, ?)`,
      [
        userId,
        editor_id ?? null,
        channels_id,
        title,
        description ?? null,
        script_draft ?? null,
        format_type,
        priority,
        scheduled_date ?? null,
      ],
    );

    const [contents] = await pool.query(
      "SELECT * FROM contents WHERE id = ? AND user_id = ?",
      [result.insertId, userId],
    );

    return res.status(201).json({
      status: true,
      message: "Content created successfully",
      data: contents[0],
    });
  } catch (error) {
    console.error("Create content error:", error);

    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

export const updateContents = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const userId = req.user.id;
    const userRole = req.user.role;
    const {
      channels_id,
      title,
      description,
      script_draft,
      format_type,
      status,
      priority,
      scheduled_date,
      published_date,
      published_url,
      editor_id,
    } = req.body;

    if (!Number.isSafeInteger(id) || id <= 0) {
      return res.status(400).json({
        status: false,
        message: "Invalid content ID",
      });
    }

    const roleStatusAccess = {
      creator: ["idea", "scripting", "recording", "editing"],
      editor: ["editing", "ready"],
      admin: [
        "idea",
        "scripting",
        "recording",
        "editing",
        "ready",
        "published",
      ],
    };

    if (!roleStatusAccess[userRole]) {
      return res.status(403).json({
        status: false,
        message: "Invalid user role",
      });
    }

    if (!roleStatusAccess[userRole].includes(status)) {
      return res.status(403).json({
        status: false,
        message: `Your role (${userRole}) cannot update content to ${status}`,
      });
    }

    const allowedStatuses = [
      "idea",
      "scripting",
      "recording",
      "editing",
      "ready",
      "published",
    ];

    if (
      typeof title !== "string" ||
      !title.trim() ||
      !allowedStatuses.includes(status)
    ) {
      return res.status(400).json({
        status: false,
        message: "A valid title and content status are required",
      });
    }

    const ownerColumn = userRole === "editor" ? "editor_id" : "user_id";
    const [existingContents] = await pool.query(
      `SELECT id, channels_id, editor_id, status, review_url, editing_url
       FROM contents
       WHERE id = ? AND ${ownerColumn} = ?`,
      [id, userId],
    );
    if (existingContents.length === 0) {
      return res.status(404).json({
        status: false,
        message: "Content not found",
      });
    }

    const existingContent = existingContents[0];
    let editorId = existingContent.editor_id;
    let reviewUrl = existingContent.review_url;
    let editingUrl = existingContent.editing_url;

    const isOptionalHttpUrl = (value) => {
      if (value == null || value === "") return true;
      if (typeof value !== "string") return false;
      try {
        return ["http:", "https:"].includes(new URL(value).protocol);
      } catch {
        return false;
      }
    };

    if (
      userRole === "creator" &&
      ["recording", "editing"].includes(status) &&
      Object.prototype.hasOwnProperty.call(req.body, "review_url")
    ) {
      if (!isOptionalHttpUrl(req.body.review_url)) {
        return res.status(400).json({
          status: false,
          message: "Invalid review URL format",
        });
      }
      reviewUrl = req.body.review_url || null;
    }

    if (
      userRole === "editor" &&
      existingContent.status === "editing" &&
      Object.prototype.hasOwnProperty.call(req.body, "editing_url")
    ) {
      if (!isOptionalHttpUrl(req.body.editing_url)) {
        return res.status(400).json({
          status: false,
          message: "Invalid editing URL format",
        });
      }
      editingUrl = req.body.editing_url || null;
    }

    if (
      userRole === "creator" &&
      Object.prototype.hasOwnProperty.call(req.body, "editor_id")
    ) {
      const normalizedEditorId =
        editor_id == null ? null : Number(editor_id);
      if (
        editor_id != null &&
        (
          !["number", "string"].includes(typeof editor_id) ||
          !Number.isSafeInteger(normalizedEditorId) ||
          normalizedEditorId <= 0
        )
      ) {
        return res.status(400).json({
          status: false,
          message: "Editor ID must be a positive integer or null",
        });
      }

      if (editor_id != null) {
        const [editors] = await pool.query(
          "SELECT id FROM users WHERE id = ? AND role = 'editor'",
          [editor_id],
        );
        if (editors.length === 0) {
          return res.status(400).json({
            status: false,
            message: "Selected editor is not valid",
          });
        }
      }
      editorId = normalizedEditorId;
    }

    const channelId =
      userRole === "editor"
        ? existingContent.channels_id
        : channels_id ?? existingContent.channels_id;

    if (status === "published") {
      if (!published_url) {
        return res.status(400).json({
          status: false,
          message: "Published URL is required when status is published",
        });
      }

      try {
        const url = new URL(published_url);
        if (!["http:", "https:"].includes(url.protocol)) {
          throw new Error("Unsupported URL protocol");
        }
      } catch (_) {
        return res.status(400).json({
          status: false,
          message: "Invalid published URL format",
        });
      }
    }

    if (userRole !== "editor" && channelId != null) {
      const [channels] = await pool.query(
        "SELECT id FROM channels WHERE id = ? AND user_id = ?",
        [channelId, userId],
      );
      if (channels.length === 0) {
        return res.status(404).json({
          status: false,
          message: "Channel not found",
        });
      }
    }

    const query = `
      UPDATE contents 
      SET channels_id = ?, 
          editor_id = ?,
          title = ?, 
          description = ?, 
          script_draft = ?, 
          format_type = ?, 
          status = ?, 
          priority = ?, 
          scheduled_date = ?, 
          published_date = ?, 
          published_url = ?, 
          review_url = ?,
          editing_url = ?,
          updated_at = NOW() 
      WHERE id = ? AND ${ownerColumn} = ?
    `;

    const values = [
      channelId ?? null,
      editorId ?? null,
      title.trim(),
      description || null,
      script_draft || null,
      format_type || "long_video",
      status,
      priority || "medium",
      scheduled_date || null,
      status === "published"
        ? published_date || new Date().toISOString().split("T")[0]
        : published_date || null,
      published_url || null,
      reviewUrl,
      editingUrl,
      id,
      userId,
    ];

    await pool.query(query, values);

    return res.status(200).json({
      status: true,
      message: "Content updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const deleteContents = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const userId = req.user.id;

    // 1. Validasi ID
    if (!Number.isSafeInteger(id) || id <= 0) {
      return res.status(400).json({
        status: false,
        message: "Invalid content ID",
      });
    }

    // 2. Cek apakah content milik user
    const [contents] = await pool.query(
      "SELECT id FROM contents WHERE id = ? AND user_id = ?",
      [id, userId],
    );

    if (contents.length === 0) {
      return res.status(404).json({
        status: false,
        message: "Content not found",
      });
    }

    // 3. Hapus content
    await pool.query("DELETE FROM contents WHERE id = ? AND user_id = ?", [
      id,
      userId,
    ]);

    // 4. Kirim response
    return res.status(200).json({
      status: true,
      message: "Content deleted successfully",
    });
  } catch (error) {
    console.error("Delete contents error:", error.message);

    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

// try {
//     const userId = req.user.id;
//     const  {channels_id, title, description, script_draft, format_type, status, priority, scheduled_date, published_date, published_url} = req.body = req.body;

//     // validasi input wajib
//     if(!channels_id || !title || !description || !script_draft || !format_type || !status || !priority)
// {
//     return res.status(400).json({
//         status: false,
//         message: "Channel ID, title, and format type are required",
//     });
// }
//     } catch (error) {

//     }

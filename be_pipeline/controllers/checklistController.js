import db from "../config/db.js";

// Validasi ID harus berupa angka positif
const isValidId = (id) => {
  return /^[1-9]\d*$/.test(String(id));
};

// Format respons error
const sendError = (res, status, message) => {
  return res.status(status).json({
    status: false,
    message,
  });
};

// Memastikan konten dimiliki oleh user yang sedang login
const canAccessContent = async (contentId, user) => {
  const [rows] = await db.execute(
    `SELECT id
     FROM contents
     WHERE id = ?
       AND (user_id = ? OR (? = 'editor' AND editor_id = ?))
     LIMIT 1`,
    [contentId, user.id, user.role, user.id]
  );

  return rows.length > 0;
};

// GET: Mengambil checklist berdasarkan content_id
export const getAllChecklists = async (req, res) => {
  try {
    const { content_id } = req.query;
    const userId = req.user?.id;

    if (!isValidId(content_id)) {
      return sendError(res, 400, "Content ID tidak valid.");
    }

    if (!userId) {
      return sendError(res, 401, "User belum terautentikasi.");
    }

    const isOwned = await canAccessContent(content_id, req.user);

    if (!isOwned) {
      return sendError(res, 404, "Konten tidak ditemukan.");
    }

    const [rows] = await db.execute(
      `SELECT id, content_id, task_name, is_completed, created_at
       FROM content_checklists
       WHERE content_id = ?
       ORDER BY created_at ASC, id ASC`,
      [content_id]
    );

    return res.status(200).json({
      status: true,
      message: "Checklist berhasil diambil.",
      data: rows,
    });
  } catch (error) {
    console.error("getAllChecklists error:", error);
    return sendError(res, 500, "Gagal mengambil data checklist.");
  }
};

// POST: Menambahkan checklist baru
export const addChecklist = async (req, res) => {
  try {
    const contentId = req.params.id;
    const userId = req.user?.id;
    const taskName = req.body?.task_name;

    if (!isValidId(contentId)) {
      return sendError(res, 400, "Content ID tidak valid.");
    }

    if (!userId) {
      return sendError(res, 401, "User belum terautentikasi.");
    }

    if (
      typeof taskName !== "string" ||
      !taskName.trim()
    ) {
      return sendError(res, 400, "Nama tugas wajib diisi.");
    }

    if (taskName.trim().length > 255) {
      return sendError(
        res,
        400,
        "Nama tugas maksimal 255 karakter."
      );
    }

    const isOwned = await canAccessContent(contentId, req.user);

    if (!isOwned) {
      return sendError(res, 404, "Konten tidak ditemukan.");
    }

    const [result] = await db.execute(
      `INSERT INTO content_checklists
       (content_id, task_name, is_completed)
       VALUES (?, ?, FALSE)`,
      [contentId, taskName.trim()]
    );

    const [rows] = await db.execute(
      `SELECT id, content_id, task_name, is_completed, created_at
       FROM content_checklists
       WHERE id = ?
       LIMIT 1`,
      [result.insertId]
    );

    return res.status(201).json({
      status: true,
      message: "Checklist berhasil ditambahkan.",
      data: rows[0],
    });
  } catch (error) {
    console.error("addChecklist error:", error);
    return sendError(res, 500, "Gagal menambahkan checklist.");
  }
};

// PATCH: Mengubah status checklist
export const toggleChecklists = async (req, res) => {
  try {
    const checklistId = req.params.id;
    const userId = req.user?.id;

    if (!isValidId(checklistId)) {
      return sendError(res, 400, "Checklist ID tidak valid.");
    }

    if (!userId) {
      return sendError(res, 401, "User belum terautentikasi.");
    }

    // Pastikan checklist dimiliki oleh user yang login
    const [checklists] = await db.execute(
      `SELECT cc.id, cc.is_completed
       FROM content_checklists cc
       INNER JOIN contents c ON c.id = cc.content_id
       WHERE cc.id = ?
         AND (c.user_id = ? OR (? = 'editor' AND c.editor_id = ?))
       LIMIT 1`,
      [checklistId, userId, req.user.role, userId]
    );

    if (checklists.length === 0) {
      return sendError(res, 404, "Checklist tidak ditemukan.");
    }

    const currentStatus = Boolean(checklists[0].is_completed);
    const nextStatus = !currentStatus;

    await db.execute(
      `UPDATE content_checklists
       SET is_completed = ?
       WHERE id = ?`,
      [nextStatus, checklistId]
    );

    return res.status(200).json({
      status: true,
      message: "Status checklist berhasil diperbarui.",
      data: {
        id: Number(checklistId),
        is_completed: nextStatus,
      },
    });
  } catch (error) {
    console.error("toggleChecklists error:", error);
    return sendError(res, 500, "Gagal memperbarui status checklist.");
  }
};

// DELETE: Menghapus checklist
export const deleteChecklist = async (req, res) => {
  try {
    const checklistId = req.params.id;
    const userId = req.user?.id;

    if (!isValidId(checklistId)) {
      return sendError(res, 400, "Checklist ID tidak valid.");
    }

    if (!userId) {
      return sendError(res, 401, "User belum terautentikasi.");
    }

    const [result] = await db.execute(
      `DELETE cc
       FROM content_checklists cc
       INNER JOIN contents c ON c.id = cc.content_id
       WHERE cc.id = ?
         AND (c.user_id = ? OR (? = 'editor' AND c.editor_id = ?))`,
      [checklistId, userId, req.user.role, userId]
    );

    if (result.affectedRows === 0) {
      return sendError(res, 404, "Checklist tidak ditemukan.");
    }

    return res.status(200).json({
      status: true,
      message: "Checklist berhasil dihapus.",
    });
  } catch (error) {
    console.error("deleteChecklist error:", error);
    return sendError(res, 500, "Gagal menghapus checklist.");
  }
};
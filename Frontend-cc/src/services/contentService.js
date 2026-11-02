import api from "./api"; // Mengimpor instance axios yang telah dikonfigurasi

export const contentService = {
  // ==========================================
  // 1. AUTHENTICATION
  // ==========================================
  async register(credentials) {
    // credentials: { name, email, password, role }
    return await api.post("/auth/register", credentials);
  },

  async login(credentials) {
    // credentials: { email, password }
    const response = await api.post("/auth/login", credentials);
    if (response.token) {
      localStorage.setItem("token", response.token);
    }
    return response;
  },

  logout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  },

  // ==========================================
  // 2. CHANNELS MANAGEMENT
  // ==========================================
  async getChannels() {
    return await api.get("/channels");
  },

  async createChannel(channelData) {
    // channelData: { platform, handle_name }
    return await api.post("/channels", channelData);
  },

  // ==========================================
  // 3. CONTENTS CRUD & PIPELINE FILTER
  // ==========================================
  async getContents(params = {}) {
    // params dapat berisi query filter seperti: { status, channel_id, format_type }
    return await api.get("/contents", { params });
  },

  async createContent(contentData) {
    // contentData: { channel_id, title, description, script_draft, format_type, priority, scheduled_date }
    return await api.post("/contents", contentData);
  },

  async getContentDetail(id) {
    return await api.get(`/contents/${id}`);
  },

  async updateContent(id, contentData) {
    // Digunakan untuk update data / transisi status (misal: ke 'published' beserta published_url)
    return await api.put(`/contents/${id}`, contentData);
  },

  async deleteContent(id) {
    return await api.delete(`/contents/${id}`);
  },

  // ==========================================
  // 4. CONTENT CHECKLISTS
  // ==========================================
  async addChecklist(contentId, taskName) {
    // taskName: { task_name }
    return await api.post(`/contents/${contentId}/checklists`, {
      task_name: taskName,
    });
  },

  async toggleChecklist(checklistId) {
    return await api.patch(`/checklists/${checklistId}/toggle`);
  },

  // ==========================================
  // 5. CONTENT METRICS / ANALYTICS
  // ==========================================
  async addContentMetric(contentId, metricData) {
    // metricData: { recorded_at, views_count, likes_count, comments_count, shares_count }
    return await api.post(`/contents/${contentId}/metrics`, metricData);
  },
};

export default contentService;

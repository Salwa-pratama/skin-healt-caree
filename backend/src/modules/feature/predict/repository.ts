import FormData from "form-data";
import axios from "axios";

const FLASK_URL = process.env.FLASK_URL ?? "http://127.0.0.1:5000";

export class PredictRepository {
  async sendToFlaskAsync(
    fileBuffer: Buffer,
    mimetype: string,
    modelEndpoint: string,
  ): Promise<{ jerawat: string; predictions: { label: string; persentase: string }[] }> {
    const form = new FormData();
    form.append("file", fileBuffer, {
      filename: "image",
      contentType: mimetype,
    });

    try {
      const response = await axios.post(`${FLASK_URL}${modelEndpoint}`, form, {
        headers: form.getHeaders(),
      });

      return {
        jerawat: response.data.data["top_prediction"],
        predictions: response.data.data["all_predictions"],
      };
    } catch (error: any) {
      console.warn(`⚠️ Warning: Failed to call plan-specific model endpoint ${modelEndpoint}. Falling back to default /api/predict... Error:`, error.message);
      
      const fallbackForm = new FormData();
      fallbackForm.append("file", fileBuffer, {
        filename: "image",
        contentType: mimetype,
      });

      const response = await axios.post(`${FLASK_URL}/api/predict`, fallbackForm, {
        headers: fallbackForm.getHeaders(),
      });

      return {
        jerawat: response.data.data["top_prediction"],
        predictions: response.data.data["all_predictions"],
      };
    }
  }
}

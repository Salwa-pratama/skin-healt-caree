import FormData from "form-data";
import axios from "axios";

const FLASK_URL = process.env.FLASK_URL ?? "http://127.0.0.1:5000";

export class PredictRepository {
  async sendToFlaskAsync(
    fileBuffer: Buffer,
    mimetype: string,
  ): Promise<{ jerawat: string; predictions: { label: string; confidence: number }[] }> {
    const form = new FormData();
    form.append("file", fileBuffer, {
      filename: "image",
      contentType: mimetype,
    });

    const response = await axios.post(`${FLASK_URL}/api/predict`, form, {
      headers: form.getHeaders(),
    });

    return {
      jerawat: response.data.data["top_prediction"],
      predictions: response.data.data["all_predictions"],
    };
  }
}

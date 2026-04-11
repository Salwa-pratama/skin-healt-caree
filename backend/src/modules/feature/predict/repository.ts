import FormData from "form-data";
import axios from "axios";

const FLASK_URL = process.env.FLASK_URL ?? "http://127.0.0.1:5000";

export class PredictRepository {
  async sendToFlaskAsync(
    fileBuffer: Buffer,
    mimetype: string,
  ): Promise<string> {
    const form = new FormData();
    form.append("file", fileBuffer, {
      filename: "image",
      contentType: mimetype,
    });

    const response = await axios.post(`${FLASK_URL}/api/predict`, form, {
      headers: form.getHeaders(),
    });

    return response.data.data["jenis-jerawat"];
  }
}

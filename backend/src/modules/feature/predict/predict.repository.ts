import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import FormData from 'form-data';

@Injectable()
export class PredictRepository {
  async sendToFlaskAsync(fileBuffer: Buffer, mimetype: string, planModel: string) {
    try {
      const form = new FormData();
      form.append("file", fileBuffer, {
        filename: "upload.jpg",
        contentType: mimetype,
      });

      let FLASK_URL = process.env.FLASK_URL || process.env.FLASK_API_URL || "http://127.0.0.1:5000/api/predict";
      if (!FLASK_URL.endsWith('/api/predict')) {
        FLASK_URL = FLASK_URL.replace(/\/$/, '') + '/api/predict';
      }
      const response = await axios.post(FLASK_URL, form, {
        headers: { ...form.getHeaders() },
        params: { model: planModel }
      });

      return response.data;
    } catch (error: any) {
      console.error("Error connecting to Flask API:", error.message);
      throw new InternalServerErrorException("Gagal menghubungi layanan AI prediksi");
    }
  }
}

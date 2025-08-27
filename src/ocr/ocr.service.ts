
import { Injectable, HttpStatus } from '@nestjs/common';
import * as Tesseract from 'tesseract.js';
import { apiResponse } from '../common/helpers/response.helper';

@Injectable()
export class OcrService {
  async extractTextFromImage(image: Buffer) {
    try {
      const { data: { text } } = await Tesseract.recognize(image);
      return apiResponse(HttpStatus.OK, 'Text extracted successfully', { text });
    } catch (error) {
      return apiResponse(HttpStatus.INTERNAL_SERVER_ERROR, 'Failed to extract text from image', error.message);
    }
  }
}

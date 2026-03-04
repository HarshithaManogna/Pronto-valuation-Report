import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();
const PORT = 3000;

app.use(express.json({ limit: '50mb' }));
app.use(express.static(__dirname));

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || 'dummy_key' });

app.post('/api/analyze', async (req, res) => {
    try {
        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ error: 'Gemini API key is missing' });
        }
        const { image } = req.body;
        const model = 'gemini-3-flash-preview';
        const response = await ai.models.generateContent({
            model,
            contents: [
                {
                    parts: [
                        { text: "Analyze this vehicle image or RC document. Extract: make, model, colour, yearOfMfg, regnNo, and a brief summary for remarks. Return JSON." },
                        { inlineData: { mimeType: 'image/jpeg', data: image.split(',')[1] } }
                    ]
                }
            ],
            config: { responseMimeType: 'application/json' }
        });
        res.json(JSON.parse(response.text || '{}'));
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Analysis failed' });
    }
});

app.post('/api/suggest', async (req, res) => {
    try {
        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ error: 'Gemini API key is missing' });
        }
        const { vehicleData } = req.body;
        const model = 'gemini-3-flash-preview';
        const response = await ai.models.generateContent({
            model,
            contents: `Based on this vehicle data: ${JSON.stringify(vehicleData)}, suggest a fair market valuation price in INR and provide professional remarks. Return JSON with 'suggestedPrice' and 'suggestedRemarks'.`,
            config: { responseMimeType: 'application/json' }
        });
        res.json(JSON.parse(response.text || '{}'));
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Suggestion failed' });
    }
});

// SPA Fallback - serve index.html for any unknown routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
});

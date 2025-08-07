const express = require('express');
const path = require('path');
require('dotenv').config();
const { CohereClient } = require('cohere-ai');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 4000;

// Initialize Cohere client
const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Homepage
app.get('/', (req, res) => {
  res.render('index', { response: null });
});

// Generate Business Plan
app.post('/generate', async (req, res) => {
  const { idea, location } = req.body;
  try {
    const result = await cohere.generate({
      model: 'command',
      prompt: `Generate a practical business plan for a "${idea}" based in ${location}. Include target market, pricing, startup steps.`,
      maxTokens: 300,
    });
    res.render('index', { response: result.generations[0].text.trim() });
  } catch (err) {
    console.error('❌ Business Plan Error:', err);
    res.render('index', { response: '⚠️ Error generating business plan.' });
  }
});

// Marketing Message
app.post('/marketing', async (req, res) => {
  const { product } = req.body;
  try {
    const result = await cohere.generate({
      model: 'command',
      prompt: `Write a creative and compelling marketing message for a product or service: "${product}".`,
      maxTokens: 150,
    });
    res.render('index', { response: result.generations[0].text.trim() });
  } catch (err) {
    console.error('❌ Marketing Error:', err);
    res.render('index', { response: '⚠️ Error generating marketing content.' });
  }
});

// Customer Message
app.post('/message', async (req, res) => {
  const { context } = req.body;
  try {
    const result = await cohere.generate({
      model: 'command',
      prompt: `Write a professional customer message based on this context: "R{context}".`,
      maxTokens: 150,
    });
    res.render('index', { response: result.generations[0].text.trim() });
  } catch (err) {
    console.error('❌ Customer Message Error:', err);
    res.render('index', { response: '⚠️ Error generating customer message.' });
  }
});

// Invoice
app.post('/invoice', async (req, res) => {
  const { details } = req.body;
  try {
    const result = await cohere.generate({
      model: 'command',
      prompt: `Generate a simple invoice based on the following details: R{details}. Format clearly.`,
      maxTokens: 200,
    });
    res.render('index', { response: result.generations[0].text.trim() });
  } catch (err) {
    console.error('❌ Invoice Error:', err);
    res.render('index', { response:' Error generating invoice.' });
  }
});

// Business Registration Help
app.post('/register-help', async (req, res) => {
  const { country } = req.body;
  try {
    const result = await cohere.generate({
      model: 'command',
      prompt: `Provide step-by-step guidance on how to register a small business in ${country}.`,
      maxTokens: 250,
    });
    res.render('index', { response: result.generations[0].text.trim() });
  } catch (err) {
    console.error('❌ Registration Help Error:', err);
    res.render('index', { response: '⚠️ Error generating registration guidance.' });
  }
});

// Export as PDF
app.post('/export', (req, res) => {
  const { content } = req.body;

  // Set headers for PDF file download
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=AI_Response.pdf');

  const doc = new PDFDocument();
  doc.pipe(res);

  doc.fontSize(16).text('AI-Generated Response', { underline: true });
  doc.moveDown();
  doc.fontSize(12).text(content || 'No content provided.', { lineGap: 6 });

  doc.end();
});
// Start server
app.listen(PORT, () => {
  console.log(` Server running at http://localhost:{PORT}`);
});





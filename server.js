console.log('Cohere API key:', process.env.COHERE_API_KEY ? 'Loaded' : 'Missing');


// Business plan generation
app.post('/generate', async (req, res) => {
  const { idea, location } = req.body;
  try {
    const result = await cohere.generate({
      prompt: `Create a detailed business plan for a township-based business idea: "${idea}" located in "${location}".`,
      maxTokens: 300,
    });
    res.render('index', { response: result.generations[0].text.trim() });
  } catch (error) {
    console.error('AI generation error:', error);
    res.render('index', { response: '⚠️ Error generating business plan. Please try again.' });
  }
});
app.post('/register-help', async (req, res) => {
  const { country } = req.body;
  console.log('Received country:', country);

  try {
    const result = await cohere.generate({
      prompt: `Provide step-by-step guidance on how to register a business in ${country}. Be clear and easy to understand.`,
      maxTokens: 500,
    });
    console.log('AI response:', result.generations[0].text.trim());

    res.render('index', { response: result.generations[0].text.trim() });
  } catch (error) {
    console.error('Registration help error:', error);
    res.render('index', { response: '⚠️ Error fetching registration help. Please try again.' });
  }
});

app.post('/marketing', async (req, res) => {
  const { product } = req.body;
  try {
    const result = await cohere.generate({
      prompt: `Write a catchy marketing message for this product or service: "${product}". Make it inspiring and locally relevant.`,
      maxTokens: 100,
    });
    res.render('index', { response: result.generations[0].text.trim() });
  } catch (error) {
    console.error('Marketing generation error:', error);
    res.render('index', { response: '⚠️ Error generating marketing message. Please try again.' });
  }
});

app.post('/message', async (req, res) => {
  const { context } = req.body;
  try {
    const result = await cohere.generate({
      prompt: `Write a professional message for a customer. Context: "${context}".`,
      maxTokens: 100,
    });
    res.render('index', { response: result.generations[0].text.trim() });
  } catch (error) {
    console.error('Message generation error:', error);
    res.render('index', { response: '⚠️ Error generating customer message. Please try again.' });
  }
});

app.post('/invoice', async (req, res) => {
  const { details } = req.body;
  try {
    const result = await cohere.generate({
      prompt: `Create a simple invoice from these details: "${details}". Include item name, quantity, unit price, total, and recipient name.`,
      maxTokens: 150,
    });
    res.render('index', { response: result.generations[0].text.trim() });
  } catch (error) {
    console.error('Invoice generation error:', error);
    res.render('index', { response: '⚠️ Error generating invoice. Please try again.' });
  }
});

app.post('/register-help', async (req, res) => {
  const { country } = req.body;
  try {
    const result = await cohere.generate({
      prompt: `Provide step-by-step guidance on how to register a business in ${country}. Be clear and easy to understand.`,
      maxTokens: 250,
    });
    res.render('index', { response: result.generations[0].text.trim() });
  } catch (error) {
    console.error('Registration help error:', error);
    res.render('index', { response: '⚠️ Error fetching registration help. Please try again.' });
  }
});




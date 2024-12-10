const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');
const Joi = require('joi');

// Initialize OpenAI
const openai = new OpenAI(process.env.OPENAI_API_KEY);

// Validation schema
const letterSchema = Joi.object({
  yourName: Joi.string().required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  county: Joi.string().required(),
  postcode: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  recipientName: Joi.string().required(),
  recipientAddress: Joi.string().required(),
  recipientEmail: Joi.string().email().required(),
  recipientCc: Joi.string().email().allow(''),
  protocols: Joi.array().items(Joi.string()).min(1).required(),
  protocolsDetails: Joi.string().required(),
  claimType: Joi.array().items(Joi.string()).min(1).required(),
  factualBackground: Joi.string().required(),
  legalBreaches: Joi.string().required(),
  lossesSuffered: Joi.string().required(),
  remediesSought: Joi.string().required(),
  responseDeadline: Joi.date().greater('now').required(),
  adr: Joi.string().required(),
  enclosures: Joi.string().allow(''),
  consent: Joi.boolean().valid(true).required()
});

router.post('/generate-letter', async (req, res, next) => {
  try {
    // Validate request body
    const { error, value } = letterSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 'error',
        message: error.details[0].message
      });
    }

    // Construct the prompt
    const prompt = `Generate a formal Letter Before Action based on the following information:
    
Sender Details:
Name: ${value.yourName}
Address: ${value.address}, ${value.city}, ${value.county}, ${value.postcode}
Email: ${value.email}
Phone: ${value.phone}

Recipient Details:
Name: ${value.recipientName}
Address: ${value.recipientAddress}
Email: ${value.recipientEmail}
${value.recipientCc ? `Cc: ${value.recipientCc}` : ''}

Selected Pre-Action Protocols: ${value.protocols.join(', ')}
Protocol Details: ${value.protocolsDetails}

Claim Types: ${value.claimType.join(', ')}

Factual Background:
${value.factualBackground}

Legal Breaches:
${value.legalBreaches}

Losses Suffered:
${value.lossesSuffered}

Remedies Sought:
${value.remediesSought}

Response Deadline: ${value.responseDeadline}

Alternative Dispute Resolution Proposals:
${value.adr}

${value.enclosures ? `Enclosures:\n${value.enclosures}` : ''}

Please format this as a formal legal letter following UK legal standards and protocols.`;

    // Generate letter using OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert legal assistant specializing in drafting formal legal correspondence according to UK standards."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 3000
    });

    const generatedLetter = completion.choices[0].message.content;

    res.json({
      status: 'success',
      data: {
        letter: generatedLetter
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
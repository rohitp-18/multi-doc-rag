import expressAsyncHandler from "express-async-handler";
import ErrorHandler from "../utils/errorHandler";
import Spell from "../models/spellModel";



const spellCheck = expressAsyncHandler(async (req, res, next) => {
  const { text } = req.body;

  if (!text) {
    return next(new ErrorHandler("Text is required for spell check", 400));
  }

  const response = await fetch(`${process.env.FASTAPI_URL}/api/v1/spell/check`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.FASTAPI_KEY}`,
    },
    body: JSON.stringify({ text }),
  });

  if (response.status !== 200) {
    return next(new ErrorHandler("Failed to get response from spell check service", 500));
  }

  const data = await response.json();

  const spellResult = await Spell.create({
    text,
    score: data.score,
    suggestions: data.suggestions,
    correctedText: data.corrected_text,
  });
  let message

  // Determine the message based on the score
  if (data.score === 1) {
    message = "No spelling errors found.";
  } else if (data.score >= 0.8) {
    message = "Minor spelling errors found.";
  }
  else if (data.score >= 0.5) {
    message = "Moderate spelling errors found.";
  }
  else {
    message = "Significant spelling errors found.";
  }



  res.status(200).json({
    correctedText: data.corrected_text,
    message,
    score: data.score,
    suggestions: data.suggestions,
  });
});

export { spellCheck };
// Import express and morgan to host the server.
import express from "express";
import logger from "morgan";
import cors from "cors";

import { getAllQuestions } from "./quiz/quiz.js";
import { getQuestionById } from "./quiz/quiz.js";

// Initialise the express app
const app = express();

app.use(cors());

// initialise morgan app
app.use(logger("dev"));
// Retrieve the port number
const PORT = process.env.PORT;
const HOST = process.env.HOST ?? "0.0.0.0";

// Endpoint to retrieve a specific question by id
app.get("/quiz/:id", async function (req, res) {
  const id = req.params.id;
  const question = await getQuestionById(id);
  // Assume 404 status if the question is not found
  if (!question) {
    return res
      .status(404)
      .json({ status: "fail", data: { msg: "Statement not found" } });
  }
  res.status(200).json({ status: "success", data: question });
});
// Endpoint to retrieve a all questions
app.get("/quiz/", async function (req, res) {
  const allQuestions = await getAllQuestions();
  res.status(200).json({ status: "success", data: allQuestions });
  // Assume 404 status if the question is not found
  if (!question) {
    return res
      .status(404)
      .json({ status: "fail", data: { msg: "Statement not found" } });
  }
  res.status(200).json({ status: "success", data: question });
});

/**
 * Useful for checking whether the server itself is running and can provide a simple response to a simple request.
 */
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    payload: "API is running correctly",
  });
});

app.listen(PORT, HOST, function () {
  console.log(`Port is running http://localhost:${PORT}`);
});

export default app;

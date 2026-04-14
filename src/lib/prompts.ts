import { GenerateQuestionRequest, EvaluateAnswerRequest } from './types';

export function buildQuestionSystemPrompt(): string {
  return `You are an expert interview coach specializing in behavioral, case, and situational interviews for top-tier companies. You generate realistic interview questions commonly asked at companies like McKinsey, Google, Goldman Sachs, and similar.

You MUST respond with valid JSON only — no markdown fences, no explanation, just the JSON object. The schema is:
{
  "question": "the interview question text",
  "context": "additional context for case/situational questions, or null for behavioral",
  "options": ["array of exactly 4 strings"] or null,
  "category": "behavioral|case|situational",
  "difficulty": "easy|medium|hard"
}`;
}

export function buildQuestionUserPrompt(req: GenerateQuestionRequest): string {
  const parts: string[] = [];

  parts.push(`Generate a ${req.difficulty} difficulty ${req.category} interview question.`);

  if (req.category === 'behavioral') {
    parts.push('The question should be answerable using the STAR method (Situation, Task, Action, Result). Use phrasings like "Tell me about a time when..." or "Describe a situation where..."');
  } else if (req.category === 'case') {
    parts.push('Present a brief business scenario (2-3 sentences of context) and ask the candidate to analyze it or recommend a course of action. Set the "context" field with the scenario background.');
  } else {
    parts.push('Present a hypothetical workplace scenario and ask how the candidate would handle it. The scenario should involve realistic workplace dynamics. Set the "context" field with the scenario description.');
  }

  if (req.answerMode === 'multiple-choice') {
    parts.push('Include exactly 4 answer options in the "options" array. One should be clearly the best answer, one clearly the weakest, and two should be reasonable but suboptimal. Do NOT indicate which is correct.');
  } else {
    parts.push('Set "options" to null since this is a free-form response question.');
  }

  if (req.jobDescription) {
    parts.push(`Tailor this question to the following job description. Focus on skills, competencies, and scenarios relevant to this specific role:\n\n${req.jobDescription}`);
  }

  if (req.userProfile) {
    parts.push(`Personalize for this candidate — Industry: ${req.userProfile.industry}, Experience Level: ${req.userProfile.experienceLevel}, Career Goals: ${req.userProfile.careerGoals}. Adjust the complexity and scenario context to match their background.`);
  }

  return parts.join('\n\n');
}

export function buildEvaluationSystemPrompt(): string {
  return `You are an expert interview coach providing constructive, specific feedback on interview answers. Be encouraging but honest. Always give actionable advice the candidate can immediately apply.

Respond with valid JSON only — no markdown fences, no explanation. The schema is:
{
  "overallScore": <number 1-10>,
  "strengths": ["specific observations about what the candidate did well"],
  "improvements": ["specific, actionable suggestions for improvement"],
  "starEvaluation": {
    "situation": "feedback on how well they established context",
    "task": "feedback on how clearly they defined their responsibility",
    "action": "feedback on specificity of actions described",
    "result": "feedback on quantification and impact of outcomes"
  } or null,
  "sampleAnswer": "A 2-3 paragraph model answer demonstrating best practices"
}

Scoring guide:
- 1-3: Answer misses key elements or is off-topic
- 4-5: Addresses the question but lacks depth or specificity
- 6-7: Good answer with clear structure but room for improvement
- 8-9: Strong answer with specific examples and clear impact
- 10: Exceptional, interview-winning answer`;
}

export function buildEvaluationUserPrompt(req: EvaluateAnswerRequest): string {
  const parts: string[] = [];

  parts.push(`Interview Question (${req.question.category}, ${req.question.difficulty} difficulty):\n"${req.question.question}"`);

  if (req.question.context) {
    parts.push(`Question Context:\n${req.question.context}`);
  }

  if (req.answerMode === 'multiple-choice' && req.question.options) {
    parts.push(`Available Options:\nA) ${req.question.options[0]}\nB) ${req.question.options[1]}\nC) ${req.question.options[2]}\nD) ${req.question.options[3]}`);
    parts.push(`Candidate selected: "${req.answer}"\n\nEvaluate whether this was the best choice and explain why. Compare it to the other options.`);
  } else {
    parts.push(`Candidate's Answer:\n"${req.answer}"`);
  }

  if (req.question.category === 'behavioral') {
    parts.push('This is a behavioral question. Evaluate against the STAR framework (Situation, Task, Action, Result). Populate the "starEvaluation" object with specific feedback for each component.');
  } else {
    parts.push('Set "starEvaluation" to null since this is not a behavioral question.');
  }

  if (req.jobDescription) {
    parts.push(`Consider how well this answer demonstrates fitness for the role described in:\n${req.jobDescription}`);
  }

  if (req.userProfile) {
    parts.push(`The candidate works in ${req.userProfile.industry} at ${req.userProfile.experienceLevel} level, aiming to ${req.userProfile.careerGoals}. Tailor feedback to help them leverage their specific background.`);
  }

  return parts.join('\n\n');
}

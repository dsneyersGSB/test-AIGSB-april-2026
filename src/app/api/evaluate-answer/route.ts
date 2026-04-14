import { NextResponse } from 'next/server';
import anthropic from '@/lib/anthropic';
import { buildEvaluationSystemPrompt, buildEvaluationUserPrompt } from '@/lib/prompts';
import { EvaluateAnswerRequest, Feedback } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const body: EvaluateAnswerRequest = await request.json();

    if (!body.question || !body.answer || !body.answerMode) {
      return NextResponse.json(
        { error: 'Missing required fields: question, answer, answerMode' },
        { status: 400 }
      );
    }

    const systemPrompt = buildEvaluationSystemPrompt();
    const userPrompt = buildEvaluationUserPrompt(body);

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2048,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    });

    const text = message.content[0].type === 'text' ? message.content[0].text : '';
    const feedback: Feedback = JSON.parse(text);

    return NextResponse.json(feedback);
  } catch (error) {
    console.error('Evaluate answer error:', error);
    return NextResponse.json(
      { error: 'Failed to evaluate answer. Please try again.' },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import anthropic from '@/lib/anthropic';
import { buildQuestionSystemPrompt, buildQuestionUserPrompt } from '@/lib/prompts';
import { GenerateQuestionRequest, GeneratedQuestion } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const body: GenerateQuestionRequest = await request.json();

    if (!body.category || !body.difficulty || !body.answerMode) {
      return NextResponse.json(
        { error: 'Missing required fields: category, difficulty, answerMode' },
        { status: 400 }
      );
    }

    const systemPrompt = buildQuestionSystemPrompt();
    const userPrompt = buildQuestionUserPrompt(body);

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    });

    const text = message.content[0].type === 'text' ? message.content[0].text : '';
    const question: GeneratedQuestion = JSON.parse(text);

    return NextResponse.json(question);
  } catch (error) {
    console.error('Generate question error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `Failed to generate question: ${message}` },
      { status: 500 }
    );
  }
}

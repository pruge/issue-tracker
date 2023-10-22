import {NextRequest, NextResponse} from 'next/server'

import prisma from '@/prisma/client'
import {createIssueSchema} from '@/app/api/issues/validation'

/**
 * create issue
 */
export async function POST(request: NextRequest) {
  const body = await request.json()
  const validation = createIssueSchema.safeParse(body)

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), {status: 400})
  }

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  })

  return NextResponse.json(newIssue, {status: 201})
}

/**
 * get issues
 *
 * TODO: pagination 추가하기.
 */
export async function GET(request: NextRequest) {
  const issues = await prisma.issue.findMany({take: 10})

  return NextResponse.json(issues, {status: 200})
}

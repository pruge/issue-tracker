import {NextRequest, NextResponse} from 'next/server'

import prisma from '@/prisma/client'
import {createIssueSchema} from '@/app/api/issues/validation'
import {getParam} from '@/app/util/url'

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
 *
 * How to get total documents count along with pagination
 * https://github.com/prisma/prisma/discussions/3087
 *
 */
export async function GET(request: NextRequest) {
  const skip = getParam<number>(request, 'skip', parseInt) || 0
  const take = getParam<number>(request, 'take', parseInt) || 10

  const issues = await prisma.$transaction([
    prisma.issue.count(),
    prisma.issue.findMany({
      skip,
      take,
      orderBy: {
        id: 'desc',
      },
    }),
  ])

  return NextResponse.json({
    total: issues[0] ?? 0,
    data: issues[1],
  })
}

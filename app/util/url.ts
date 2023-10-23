import {NextRequest} from 'next/server'

export const getParam = <T = string>(
  request: NextRequest,
  name: string,
  convert: any,
): T => {
  const param = request.nextUrl.searchParams.get(name)
  if (convert) return convert(param)
  //TODO 어떻게 해야 할까 ?
  // @ts-ignore
  return param || ''
}

import dynamic from 'next/dynamic'

/**
 * ! IssueCreateForm 이 use client를 선언했음에도, build 시 에러 발생
 * ! 초기 렌더링을 SSR 로 진행한다. 그래서 navigator is not defiend 에러 발생
 * ! 그래서 dynamic import를 ssr:false 옵션을 줘서 가져오개 하였다.
 * https://github.com/vercel/next.js/discussions/11013
 */
const IssueCreateForm = dynamic(
  () => import('@/app/components/issues/IssueCreateForm'),
  {
    ssr: false,
  },
)

const NewIssuePage = () => {
  return <IssueCreateForm />
}

export default NewIssuePage

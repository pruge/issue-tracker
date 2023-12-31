'use client'

import 'easymde/dist/easymde.min.css'
import {Button, Callout, TextField} from '@radix-ui/themes'
import {useState} from 'react'
import {useRouter} from 'next/navigation'
import {Controller, useForm} from 'react-hook-form'
import SimpleMDE from 'react-simplemde-editor'
import * as api from '@/app/api'
import {IssueForm} from '@/app/api/issues/entity'
import ErrorMessage from '@/app/components/ErrorMessage'
import Spinner from '@/app/components/Spinner'
import {zodResolver} from '@hookform/resolvers/zod'
import {createIssueSchema} from '@/app/api/issues/validation'

const IssueCreateForm = () => {
  const router = useRouter()
  const [error, setError] = useState('')
  const [isSubmitting, setSubmitting] = useState(false)

  const {
    register,
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true)
      await api.issues.createIssue(data)
      router.push('/issues')
    } catch (error) {
      setError('An unexpected error occurred.')
      setSubmitting(false)
    }
  })

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          {error}
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register('title')} />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({field}) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          Submit New Issue {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  )
}

export default IssueCreateForm

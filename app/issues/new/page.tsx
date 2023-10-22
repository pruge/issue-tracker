'use client'
import React, {useState} from 'react'
import {Button, Callout, Text, TextArea, TextField} from '@radix-ui/themes'
import SimpleMDE from 'react-simplemde-editor'
import {Controller, useForm} from 'react-hook-form'
import 'easymde/dist/easymde.min.css'
import axios from 'axios'
import {useRouter} from 'next/navigation'
import {zodResolver} from '@hookform/resolvers/zod'
import {createIssueSchema} from '@/app/validationSchemas'
import {z} from 'zod'
import ErrorMessage from '@/app/components/ErrorMessage'

type IssueForm = z.infer<typeof createIssueSchema>
// interface IssueForm {
//   title: string
//   description: string
// }

const NewIssuePage = () => {
  const router = useRouter()
  const {
    register,
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  })
  const [error, setError] = useState('')

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          {error}
        </Callout.Root>
      )}
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post('/api/issues', data)
            router.push('/issues')
          } catch (error) {
            setError('An unexpected error occurred.')
          }
        })}
      >
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
        <Button>Submit New Issue</Button>
      </form>
    </div>
  )
}

export default NewIssuePage

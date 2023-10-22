'use client'
import React, {useState} from 'react'
import {Button, Callout, TextArea, TextField} from '@radix-ui/themes'
import SimpleMDE from 'react-simplemde-editor'
import {Controller, useForm} from 'react-hook-form'
import 'easymde/dist/easymde.min.css'
import axios from 'axios'
import {useRouter} from 'next/navigation'

interface IssueForm {
  title: string
  description: string
}

const NewIssuePage = () => {
  const router = useRouter()
  const {register, control, handleSubmit} = useForm<IssueForm>()
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
        <Controller
          name="description"
          control={control}
          render={({field}) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <Button>Submit New Issue</Button>
      </form>
    </div>
  )
}

export default NewIssuePage

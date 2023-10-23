import {z} from 'zod'

export const OptionType1Schema = z.object({
  current: z.number(),
  pageSize: z.number(),
  total: z.number(),
  limit: z.number(),
  showFirstButton: z.boolean(),
  showLastButton: z.boolean(),
  hideNextButton: z.boolean(),
  hidePrevButton: z.boolean(),
})

export const OptionType2Schema = OptionType1Schema

export const OptionType3Schema = z.object({
  current: z.number(),
  pageSize: z.number(),
  total: z.number(),
  limit: z.number(),
  showFirstButton: z.boolean(),
  showLastButton: z.boolean(),
  hideNextButton: z.boolean(),
  hidePrevButton: z.boolean(),
  boundaryCount: z.number(),
  siblingCount: z.number(),
})

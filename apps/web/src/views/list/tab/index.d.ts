export type ListModel = {
  field1: string
  field2: string
  field3: string
  field4: string
  field5: string
  field6: string
  field7: string
  field8: string
  field9: string
  field10: string
  field11: string
  field12: string
  field13: string
  field14: string
  field15: string
}

export type SearchModel = Pick<
  ListModel,
  'field1' | 'field2' | 'field3' | 'field4' | 'field5' | 'field6' | 'field7' | 'field8'
>

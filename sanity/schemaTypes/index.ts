import { type SchemaTypeDefinition } from 'sanity'
import order from './order'
import product from './product'
import customer from './customer'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [order,product,customer],
}

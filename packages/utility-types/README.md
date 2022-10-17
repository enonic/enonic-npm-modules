Enonic Utility Types
===

## Install

```sh
npm i --save-dev @enonic/utility-types
```

> Requires TypeScript >= 2.0.0

## Usage

Import types from your TypeScript code:

```ts
import type {LiteralUnion} from '@enonic/utility-types';

interface Car {
  color: LiteralUnion<'black' | 'white'>;
}

const rav4: Car = {color: 'black'};

const f150: Car = {color: 'gray'};

```


## Types

* `Unwrapped` — unwraps array.

  ```ts
  const foo: Unwrapped<string[]> = 'plain';
  const bar: Unwrapped<string[][]> = ['nested'];
  ```
  <br/>
* `Flattened` — recursively unwraps array, returning the first non-array type.

  ```ts
  const foo: Flattened<string[][]> = 'plain';
  ```
  <br/>
* `WithRequiredProperty` — markes a specified property as required.

  ```ts
  interface Entry {
    id: string;
    name?: string;
  }
  <br/>
  type UserEntry = WithRequiredProperty<Entry, 'name'>;

  const user: UserEntry = {id: '0f3c24aa6b7'}; // ERROR: Property 'name' is missing
  ```
  <br/>
* `KeysOfType` — returns a literal union of keys of specific type.

  ```ts
  interface Animal {
    type: string;
    walk: () => void;
    eat: (food: unknown) => void;
  }
  <br/>
  const animalAction: KeysOfType<Animal, Function> = 'walk';
  ```
  <br/>
* `LiteralUnion` — creates a literal union that can also accept less narrow type.

  ```ts
  type Animals = LiteralUnion<'dog' | 'cat'>;

  // Autocomplete works, showing 'dog' and 'cat' values in suggestions
  const firstPet: Animal = 'dog';
  // 'parrot' is not suggested, but is an allowed value (`string` is a fallback common type)
  const secodPet: Animal = 'parrot';

  // literal union can be of any type
  type Count = LiteralUnion<1 | 2, number>;
  ```
  <br/>
* `OneOrMore` — a single item of a type, or an Array of items of that type

  ```ts
  interface MyNodeType {
    list: OneOrMore<Item>
  }
  const node = connection.get<MyNodeType>(nodeId);
  const {list} = node;
  // Will give type error
  list.map((item) => ...)
  // No type error, we remembered to handle both single item and array of items
  forceArray(list).map((item) => ...)
  ```

## License

[MIT](LICENSE) © [Enonic](https://enonic.com)

# @esmkit/promise

high-performance JavaScript utility library with a small bundle size and strong type annotations.

## Features

- 🚀 **High Performance**: optimized for performance.
- 📦 **Small Bundle Size**: small bundle size.
- 🎯 **Strong Type Annotations**: written in TypeScript with full types support.

## Installation

```bash
npm install @esmkit/promise
bun add @esmkit/promise
```

## delay

Delays the execution of code for a specified number of milliseconds.

This function returns a Promise that resolves after the specified delay, allowing you to use it
with async/await to pause execution.
It also supports an optional AbortSignal to cancel the delay.

### Signature

```typescript
function delay(ms: number, options?: DelayOptions): Promise<void>;
```

#### Parameters

- `ms` (`number`): The number of milliseconds to delay.
- `options` (`DelayOptions`, optional): An options object.
  - `signal` (`AbortSignal`, optional): An optional `AbortSignal` to cancel the delay.

#### Returns

(`Promise<void>`): A Promise that resolves after the specified delay.

### Examples

### Basic Usage

```typescript
import { delay } from '@esmkit/promise';

async function foo() {
  console.log('Start');
  await delay(1000); // Delays execution for 1 second
  console.log('End');
}

foo();
```

### Using with an AbortSignal

```typescript
import { delay } from '@esmkit/promise';

async function foo() {
  const controller = new AbortController();
  const signal = controller.signal;

  setTimeout(() => controller.abort(), 50); // Will cancel the delay after 50ms
  try {
    await delay(1000, { signal });
  } catch (error) {
    console.log(error); // Will log 'The operation was aborted'
  }
}
```

## timeout

Returns a `Promise` that rejects with a `TimeoutError` after the specified timeout.

### Signature

```typescript
function timeout(ms: number): Promise<never>;
```

#### Parameters

- `ms` (`number`): The number of milliseconds for the promise to reject with `TimeoutError`.

#### Returns

(`Promise<never>`): A Promise that rejects after the specified timeout.

### Examples

```typescript
import { timeout } from '@esmkit/promise';

try {
  await timeout(1000); // Timeout exception after 1 second
} catch (error) {
  console.error(error); // Will log 'The operation was timed out'
}
```

## withTimeout

Executes an async function and enforces a timeout.

If the promise does not resolve within the specified time,
the timeout will trigger and the returned promise will be rejected.

### Signature

```typescript
function withTimeout<T>(run: () => Promise<T>, ms: number): Promise<T>;
```

#### Parameters

- `run` (`() => Promise<T>`): A function that returns a promise to be executed.
- `ms` (`number`): The timeout duration in milliseconds.

#### Returns

(`Promise<T>`): A promise that resolves with the result of the `run` function or rejects if the timeout is reached.

### Examples

```typescript
import { withTimeout } from '@esmkit/promise';

async function fetchData() {
  const response = await fetch('https://example.com/data');
  return response.json();
}

try {
  const data = await withTimeout(fetchData, 1000);
  console.log(data); // Logs the fetched data if `fetchData` is resolved within 1 second.
} catch (error) {
  console.error(error); // Will log 'TimeoutError' if `fetchData` is not resolved within 1 second.
}
```

## License

MIT © BILLGO.ME & Viva Republica, Inc

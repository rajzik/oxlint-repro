# oxfmt license header bug repro

Minimal reproduction for an [oxfmt](https://oxc.rs/docs/guide/usage/formatter.html) formatting bug: `oxfmt --write` moves `import` statements **above** a file-level license header instead of keeping the header first.

## Expected behavior

A license comment block at the top of a file should stay at the top. Imports and other code should come **after** the header:

```ts
/**
 * Copyright (c) 2026 Your Company
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { a } from "./module-a";
import { b } from "./module-b";

console.log(`${a} and ${b}`);
```

## Actual behavior

Running `pnpm run format:fix` (which runs `oxfmt --write`) hoists imports above the license header:

```ts
import { a } from "./module-a";
/**
 * Copyright (c) 2026 Your Company
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { b } from "./module-b";

console.log(`${a} and ${b}`);
```

The header is no longer the first statement in the file, which breaks common license-header tooling and project conventions.

## Reproduction

```bash
pnpm install
pnpm run format:fix
git diff src/license-header.ts
```

See [`src/license-header.ts`](src/license-header.ts) for the test file.

## Configuration

[`oxfmt.config.ts`](oxfmt.config.ts) enables `experimentalSortImports` with grouped import sorting. The bug reproduces with this config; the incorrect ordering is visible even when import sorting is the trigger.

## Environment

- `oxfmt`: ^0.55.0
- `oxlint`: ^1.70.0

## Related

This repo also contains other oxlint reproduction cases under `src/`.

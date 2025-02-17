# Opencast Shared ESLint config (for TS + React)

ESLint configuration used by many Opencast-related frontend projects.
This configuration contains rules for TypeScript and React, so it's only useful for projects using both of those.

## Usage

Run:

```
npm install --save-dev @opencast/eslint-config-ts-react
```

And add this to your ESLint config (e.g. `eslint.config.js`):

```javascript
import opencastConfig from "@opencast/eslint-config-ts-react";

export default [
  ...opencastConfig,

  // ... your other configs
];
```

Also make sure you already have `eslint` and all other [`peerDependencies` of this configuration](./package.json) in your `package.json`.


# License

Licensed as [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/).

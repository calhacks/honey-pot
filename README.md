# honey-pot

Internal (and slightly external) dashboard to for [Hackathons @ Berkeley](https://hackberkeley.org/) and our [events](https://calhacks.io/).

## Setup

### Install [`pnpm`](https://pnpm.io/)

Follow the instructions on [`pnpm.io`](https://pnpm.io/), or install using cURL

```bash
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

### Clone `honey-pot`'s Dev Branch & Dependencies

```bash
git clone git@github.com:calhacks/honey-pot.git -b dev
cd honey-pot
pnpm install
```

### Environment Variables

```bash
pnpx vercel link
# ? Set up “~/Personal/calhacks/honey-pot”? (Y/n)
Y
# ? Which scope should contain your project? (Use arrow keys)
❯ Hackathons at Berkeley
# ? Found project “hackathons-at-berkeley/honey-pot”. Link to it? (Y/n)
Y
pnpx vercel env pull .env.development.local
```

### Supabase

```bash
pnpx supabase login
pnpm gen:supabase # generate database schemas to local types
```

### Development

```bash
pnpm dev
```

## Tooling

### Linter

`honey-pot` uses [oxlint](https://oxc.rs/docs/guide/usage/linter.html) for linting (`pnpm lint`, `pnpm lint:fix`). Your development experience will heavily benefit from Oxidation Compiler's tooling. Oxc's tooling support [is found here](https://oxc.rs/docs/guide/usage/linter.html#vscode-extension).

### Formatting

`honey-pot` uses [Biome](https://biomejs.dev/) for formatting (`pnpm fmt`, `pnpm fmt:fix`). Your development experience will heavily benefit from Biome's tooling. Biome's tooling support [is found here](https://biomejs.dev/guides/getting-started/#editor-integrations).

We will (probably) migrate to [Oxc Formatter](https://github.com/oxc-project/oxc/tree/main/crates/oxc_formatter) once stable!

## Contributing

Make sure to follow all the steps in [development](#development).

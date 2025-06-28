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
vercel link
# ? Set up “~/Personal/calhacks/honey-pot”? (Y/n)
Y
# ? Which scope should contain your project? (Use arrow keys)
❯ Hackathons at Berkeley
# ? Found project “hackathons-at-berkeley/honey-pot”. Link to it? (Y/n)
Y
vercel env pull .env.development.local
```

### Supabase

```bash
supabase login
pnpm gen:supabase # generate database schemas to local types
```

### Development

```bash
pnpm dev
```

## Contributing

Make sure to follow all the steps in [development](#development).

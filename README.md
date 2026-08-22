# Lever9 website

Static Lever9 website source.

## Run locally

```sh
python3 -m http.server 5173
```

Then open `http://localhost:5173/`.

## Deployment workflow

1. Make and commit changes in this private `website` repo.
2. Deploy the generated public staging copy:

```sh
./scripts/deploy-staging.sh
```

3. Review staging:

```txt
https://lever9solutions.github.io/website-staging/
```

4. After approval, push the production-clean source:

```sh
./scripts/deploy-production.sh
```

## How staging differs

The source files in this repo should stay production-clean. `scripts/build-staging.sh` generates staging-only changes in `.deploy/staging`:

- every HTML page gets `noindex, nofollow`
- `robots.txt` blocks crawlers
- `staging.css` and `staging.js` add the visible `Staging` badge
- page titles are prefixed with `Staging /` at runtime

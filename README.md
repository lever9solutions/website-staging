# Lever9 staging page

Static staging copy of the public Lever9 website.

## Run locally

```sh
python3 -m http.server 5173
```

Then open `http://localhost:5173/`.

## Staging safeguards

- Every HTML page includes `noindex, nofollow`.
- `robots.txt` disallows all crawlers.
- The shared header displays a `Staging` badge.
- Page titles are prefixed with `Staging /` at runtime.

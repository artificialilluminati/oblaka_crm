# GitHub preparation — November 19, 2026

Active project: `outputs/oblaka-studio`. The running Next.js preview uses this directory. The older sibling `maison-rose` copy and ZIP archives were left untouched and are outside this repository.

Git was not initialized. It is now initialized on `main`, with `origin` set to:

https://github.com/artificialilluminati/oblaka_crm.git

A read-only `git ls-remote origin` check succeeded and returned no refs, consistent with an empty repository. Nothing has been pushed and no initial commit has been made.

## Exclusions and review

`.gitignore` excludes dependencies, generated Next.js/build output, environment files (including `.env.local`), local credentials and key files, Cloudflare local state, spreadsheet/CSV exports, local databases, private import/export folders, archives and logs. Environment example files are allowed; keep only placeholders in them.

The candidate source/configuration/documentation files were checked for common provider tokens, private-key headers, credentials embedded in URLs and literal secret assignments. No matching secrets were found. No client workbook/CSV is included. The source directory contains fictional demo contacts, example.com email addresses and the public OBLAKA business phone number. Real client imports and uploaded photos remain browser-local, outside source control; exported copies must stay in ignored folders or file formats.

These checks cover the current files, not a guarantee about future additions. Before each commit, review `git diff --cached` and `git status`. `.gitignore` does not prevent a forced add, and does not remove files already tracked later. Do not put private client records into source files or public assets.

All existing website code, tests, design assets and configuration were preserved. Only Git metadata, `.gitignore` and this preparation note were added/updated. No project files were deleted.

## Next steps

From this project directory, review the staged files:

```sh
git status
git diff --cached --stat
git diff --cached
```

Then create and push the initial commit when ready:

```sh
git commit -m "Initial OBLAKA Studio website"
git push -u origin main
```

GitHub may request authentication or write access at push time. The successful read check does not prove write permission. If Git asks for an author identity, configure your preferred name and email locally in this repository before committing. Never place an access token in the remote URL or in a committed file.

Both existing npm and pnpm lockfiles were preserved. Use one package manager consistently for future dependency changes to avoid lockfile drift. The project remains a browser-local prototype; production authentication, shared database, messaging and payment integration remain separate work described in the existing documentation.

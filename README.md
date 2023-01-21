# README

This template shows how to put together an app with the tooling and infrastructure described below.

## Step-by-Step Setup

### Preparation

#### GitHub

1.  Create a new repository on GitHub
2.  In the repository settings, add two environments `preview` (with `dev/*` as allowed branch) and `production` (with `main` as allowed branch)
3.  For each environment, add the following environment secrets with their appropriate values:

    - `NODE_ENV` (preview/production) for frontend builds
    - `NODE_VERSION` (18.12.1) for frontend builds
    - `PRIVATE_CLOUDFLARE_API_TOKEN` for publishing pages and workers
    - `PRIVATE_SENTRY_AUTH_TOKEN` for uploading releases
    - `PUBLIC_CLERK_FRONTEND_API` for frontend builds
    - `PUBLIC_CLERK_JWT_VERIFICATION_KEY` for frontend builds
    - `PUBLIC_ENVIRONMENT` (preview/production) for frontend builds
    - `PUBLIC_SENTRY_DSN_PAGE_APP` for frontend builds
    - `PUBLIC_SENTRY_DSN_PAGE_WWW` for frontend builds
    - `PUBLIC_SENTRY_DSN_WORKER_STRIPE` for frontend builds
    - `PUBLIC_SENTRY_DSN_WORKER_TEST` for frontend builds

TODO: What to do with package specific environment variables like SENTRY_DSN?

#### Cloudflare

1.  Create a Cloudflare account
2.  Create an API key that can edit Cloudflare Worker under <https://dash.cloudflare.com/profile/api-tokens>
3.  For every `page-...` package, run `yarn wrangler pages project create [package-name] --production-branch main` (TODO: automate this with an yarn init step ???)
4.  Once each `page-...` and `worker-...` package has been deployed for the first time, add the environment variables that each package needs in the Cloudflare Dashboard under the respective page or worker settings.
    This is needed for all environment variables that are not hard coded in a static build step (so primarily for workers and functions).
    See the packages `.dev.vars` files for a list of necessary environment variables (TODO: These have to be documented in the package READMEs, since they wont be commited to the repo!)

#### Clerk

2.  Create a Clerk account

#### Stripe

3.  Create a Stripe account

#### Sentry

1.  Create a Sentry account
2.  Create an internal integration with admin permission for release and read permission for organization -> PRIVATE_SENTRY_AUTH_TOKEN
3.  Create a project for each `page-...` and `worker-...` package with the same name.
4.  For each of these projects, copy its corresponding client keys (DSN) to a environment variable named `PUBLIC_SENTRY_DSN_[PROJECT_NAME]`

## Architecture

TODO: use dependency injection <https://medium.com/analytics-vidhya/dependency-injection-in-javascript-with-no-libraries-8ad1aba74fbd>

TODO: inject environment
TODO: inject configuration

TODO: Add eslint astro plugin

<https://proandroiddev.com/why-you-need-use-cases-interactors-142e8a6fe576>
<https://www.patterns.dev/posts/command-pattern/>

## Testing

See <https://cucumber.io/blog/bdd/where_should_you_use_bdd/>
\-> BDD (Cucumber everywhere where the business is interested -> entities and use-cases, and end-to-end testincluding UI)
\-> Unit Tests (Vitest) everywhere else (adapters, integration tests between layers)

Want to use expect from vitest, but get error: TypeError: Cannot read properties of undefined (reading 'config')
If resolved, chai can be replaced with vitest when importing expect

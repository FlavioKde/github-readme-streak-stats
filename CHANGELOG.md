# Changelog

All notable changes in this fork will be documented in this file

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]
### Added
### Changed
### Fixed
### Removed

## [0.2.0] - 2026-02-18
### Added
- JS implementation of calculateStreak (domain layer)
- GitHub GraphQL client (infrastructure layer)
- `/api/streak/stats` serverless endpoint
- githubMapper.js to transform GitHub response
- Class `BaseError.js`, `GithubApiError.js`, `ValidationError.js` in shared/errors and `index.js`

## [0.1.0] - 2026-02-05
### Added
- Created `architecture.md`
- Applied clean architecture principles
- Restructured project folders

## [0.0.2] - 2026-02-02
### Added
- Basic Vercel API structure with endpoints
- `/api/streak/stats` endpoint skeleton
- GitHub API client in `lib/github.js`
- Streak calculation utilities in `lib/streak.js`
- Vercel configuration in `vercel.json`
- Updated `package.json` with Vercel dependencies and scripts

### Changed
- Modified `/api/hello` endpoint for service status
- Modified `package.json` to support Node.js runtime for Vercel API
- Updated README.md with fork documentation and Vercel instructions

### Technical
- Setup project structure for serverless deployment
- Prepared foundation for GitHub GraphQL integration
- Configured CORS and cache headers for API endpoints


## [0.0.1] - 2026-02-01
### Added
- API Folder for Vercel
- API/hello and API/index for testing endpoint
- ./CHANGELOG.md changes documentation
- docs/vercel-guide.md deployment in Vercel

---
*This CHANGELOG documents only the modifications to the fork.
For original features, please refer to the original project documentation.*

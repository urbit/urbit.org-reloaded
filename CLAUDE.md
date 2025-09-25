# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js-based website for urbit.org using the Markdoc content management approach. The site is built with Next.js 14 in the App Router architecture and uses Tailwind CSS for styling. Content is managed through Markdown files with custom Markdoc tags and components.

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build production version
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Architecture

### Content Management
- Content lives in `app/content/` directory organized by type (blog, events, grants, etc.)
- Markdown files use both YAML frontmatter (default) and TOML frontmatter (delimited by `+++`)
- Markdoc configuration in `app/markdocConfig.js` defines custom tags and components
- Content queries handled by `app/lib/queries.js` using gray-matter and glob

### Next.js Structure
- App Router architecture with pages in `app/` directory
- Dynamic routes use bracket notation: `[page]/page.js`, `[blog]/page.js`
- Root layout in `app/layout.js` includes global navigation and footer
- Global styles in `app/globals.css`

### Custom Components
- Custom Markdoc components in `app/components/` for content rendering
- Key components: `OverviewSection`, `IconCard`, `FaqSection`, `SigilCard`
- `MarkdocComponents.js` contains shared Markdoc utilities

### Configuration
- Next.js config uses `@markdoc/next.js` plugin with custom schema path
- Static export configuration (`output: 'export'`)
- Image optimization disabled (`unoptimized: true`)
- Supports multiple page extensions: `.js`, `.jsx`, `.ts`, `.tsx`, `.md`, `.mdoc`
- Tailwind configured for dark mode with custom Urbit fonts and color scheme

### Data Flow
1. Content files in `app/content/` are processed by `queries.js`
2. Markdoc parses and transforms content using `markdocConfig.js`
3. Dynamic pages render content through Next.js App Router
4. Custom components handle special content types and layout

## Key Files
- `app/markdocConfig.js` - Markdoc tag and component definitions
- `app/lib/queries.js` - Content fetching and processing utilities
- `app/layout.js` - Root application layout with navigation
- `tailwind.config.js` - Custom Tailwind configuration with Urbit design tokens
- `next.config.js` - Next.js configuration with Markdoc integration

## Content Structure
The site organizes content into several main categories:
- Blog posts (`app/content/blog/`)
- Community pages (`app/content/communities/`)
- Events (`app/content/events/`)
- Grants (`app/content/grants/`)
- General pages for overview sections and navigation

Content files support custom Markdoc tags like `{% iconcard %}`, `{% overview-section %}`, `{% faqSection %}` for rich layouts.
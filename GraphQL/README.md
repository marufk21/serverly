# GraphQL Notes App

A simple notes application built with Next.js, GraphQL, and TypeScript.

## Features

- Create, read, update, and delete notes
- GraphQL API with Apollo Server
- Client-side GraphQL requests with Apollo Client
- Responsive UI with Tailwind CSS
- shadcn/ui components
- Organized project structure with separate UI and test directories

## Project Structure

```
graphql-notes-app/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                      # Home - show all notes
│   ├── add/
│   │   └── page.tsx                  # Add note page
│   ├── edit/
│   │   └── [id]/page.tsx             # Edit note page
│   ├── globals.css                   # Tailwind/global styles
│   └── api/
│       └── graphql/
│           └── route.ts              # GraphQL API endpoint
│
├── graphql/
│   ├── schema.ts                     # GraphQL schema (typeDefs)
│   └── resolvers.ts                  # Query + Mutation resolvers
│
├── lib/
│   ├── db.ts                         # Database (in-memory or Prisma setup)
│   ├── graphqlClient.ts              # For frontend GraphQL requests
│   └── utils.ts                      # Utility functions
│
├── components/
│   ├── ApolloWrapper.tsx             # Apollo Provider wrapper
│   ├── note_card.tsx                 # Single note UI
│   ├── note_form.tsx                 # Form for add/edit note
│   └── notes_list.tsx                # List of notes
│
├── ui/
│   ├── button.tsx                    # shadcn/ui button component
│   ├── card.tsx                      # shadcn/ui card component
│   ├── dialog.tsx                    # shadcn/ui dialog component
│   ├── index.ts                      # UI component exports
│   ├── input.tsx                     # shadcn/ui input component
│   ├── label.tsx                     # shadcn/ui label component
│   └── textarea.tsx                  # shadcn/ui textarea component
│
├── __tests__/
│   ├── completeAppTest.ts            # Application tests
│   ├── completeTest.ts               # Complete tests
│   ├── frontendTest.ts               # Frontend tests
│   ├── graphqlEndpointTest.ts        # GraphQL endpoint tests
│   ├── schemaTest.ts                 # Schema tests
│   ├── simpleTest.ts                 # Simple tests
│   ├── standaloneTest.ts             # Standalone tests
│   ├── testAPIRoute.ts               # API route tests
│   ├── testGraphQL.ts                # GraphQL tests
│   └── testGraphQLEndpoint.ts        # GraphQL endpoint tests
│
├── hooks/
│   └── useNotes.ts                   # GraphQL hooks for notes operations
│
├── types/
│   └── note.ts                       # TypeScript types for Note
│
├── package.json
├── tsconfig.json
├── next.config.mjs
└── tailwind.config.ts
```

## Getting Started

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Run the development server:

   ```bash
   cd GraphQL
   pnpm dev
   ```

   Or if pnpm doesn't work properly in your environment:

   ```bash
   cd GraphQL
   npx next dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## GraphQL API

The GraphQL API is available at `/api/graphql`.

### Queries

- `notes`: Get all notes
- `note(id: ID!)`: Get a specific note by ID

### Mutations

- `createNote(title: String!, content: String!)`: Create a new note
- `updateNote(id: ID!, title: String, content: String)`: Update an existing note
- `deleteNote(id: ID!)`: Delete a note

## Technologies Used

- [Next.js](https://nextjs.org/)
- [GraphQL](https://graphql.org/)
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
- [Apollo Client](https://www.apollographql.com/docs/react/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)

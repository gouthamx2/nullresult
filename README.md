# NullResult

An open-access registry and searchable repository for negative results, failed experiments, and methodological dead ends in scientific research.

---

## Overview

Academic literature suffers from severe publication bias: journals predominantly publish successful outcomes and statistically significant findings. Unsuccessful trials, flawed methodologies, and disproven hypotheses are rarely documented, creating the classic "file-drawer problem."

The consequence is massive systemic inefficiency: researchers routinely duplicate failed protocols, waste grant funding, and consume valuable lab hours repeating mistakes others have already made and discarded.

**NullResult** addresses this gap by making negative findings discoverable, reproducible, and citable. Researchers can search existing records before designing protocols, document their own negative outcomes with structured post-mortems, and receive an identifier (`NR-YYYY-NNNN`) suitable for academic citation.

---

## Core Capabilities

### 1. Pre-Experiment Search
- Full-text search across titles, hypotheses, experimental protocols, observed failures, and tags.
- Field-specific filtering across Disciplines: Materials Science, Chemistry, Biology, Computer Science, Physics, Environmental Science, and Engineering.
- Query intent matching to quickly show how many independent teams attempted comparable protocols.

### 2. Structured Failure Logging
Every logged experiment requires standardized reporting fields designed to diagnose root causes:
- **Hypothesis**: The original premise being tested.
- **Protocol / Method**: Exact reagents, equipment, conditions, and procedures used.
- **Observed Outcome**: Empirical measurements and why the attempt failed.
- **Probable Mechanism / Post-Mortem**: Technical analysis of why the hypothesis broke down.
- **Photographic / Diagnostic Evidence**: Supporting microscopy, plots, or setup photos.

### 3. Persistent Identifiers & Standard Citation
Every accepted entry is assigned an atomic sequential reference number formatted as:

```text
NR-YYYY-NNNN   (e.g., NR-2026-0001)
```

Entries feature a one-click citation generator matching standard academic formats:

```text
Thomas, A. "Biodegradable plastic film from banana peel starch and glycerol." 
NullResult, NR-2026-0001, October 2026. https://nullresult.vercel.app/entry/NR-2026-0001
```

### 4. Researcher Attribution & Profiles
- User authentication via NextAuth.
- Public researcher profiles listing all documented negative findings and estimated research hours saved for the community.
- Built-in honeypot and input validation to maintain catalog integrity.

---

## Technology Stack

- **Application Framework**: [Next.js 15](https://nextjs.org/) (App Router, Server Actions, React 19)
- **Database**: [MongoDB Atlas](https://www.mongodb.com/atlas) (Full-text indexes, aggregation pipelines, atomic counter sequences)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/) with bcrypt credential hashing
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Runtime & Deployment**: Node.js 20+, deployed natively on [Vercel](https://vercel.com/)

---

## Data Model

Entries are stored as structured BSON documents in the `entries` collection:

```typescript
interface EntryDoc {
  _id: string;
  nr_id: string;             // Persistent identifier: NR-2026-0001
  title: string;
  field: string;             // Chemistry, Materials, Computer Science, etc.
  hypothesis: string;
  method: string;
  outcome: string;
  probable_reason: string;
  tags: string[];
  image_url?: string;
  contributor_name: string;
  contributor_email?: string;
  user_id?: string;          // Linked user account
  created_at: Date;
}
```

Sequential ID generation is managed atomically through a dedicated `counters` collection to prevent collisions under concurrent submissions.

---

## Getting Started

### Prerequisites

- Node.js 18.18+ or Node.js 20+
- A running MongoDB instance (or free MongoDB Atlas cluster)

### 1. Clone the repository

```bash
git clone https://github.com/gouthamx2/nullresult.git
cd nullresult
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Populate the required configuration keys:

| Variable | Description | Example |
| :--- | :--- | :--- |
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/nullresult` |
| `NEXTAUTH_SECRET` | 32+ character random secret for session encryption | Run `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Canonical app URL (optional in production on Vercel) | `http://localhost:3000` |

### 4. Seed the database

Populate the database with curated negative result records across multiple disciplines:

```bash
npm run seed
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Deployment (Vercel)

NullResult is structured for zero-configuration deployments on Vercel:

1. Push your repository to GitHub.
2. Import the repository in the [Vercel Dashboard](https://vercel.com/new).
3. Under **Environment Variables**, add:
   - `MONGODB_URI`
   - `NEXTAUTH_SECRET`
4. Click **Deploy**.

> **Note**: Ensure your MongoDB Atlas cluster has `0.0.0.0/0` added under **Network Access** so Vercel's serverless regions can establish database connections.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

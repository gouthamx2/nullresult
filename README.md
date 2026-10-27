# NullResult 🚀

> **"Science publishes what worked. We keep what didn't."**

NullResult is a searchable, citable library of failed experiments and negative results. Researchers search before starting a project to avoid repeating known dead ends, log their own failed attempts, and receive a permanent, citable ID (`NR-YYYY-NNNN`).

---

## 🛠 Tech Stack

- **Next.js 15** (App Router, Server Actions, React 19)
- **TypeScript** & **Tailwind CSS** (clean academic-grade UI)
- **MongoDB Atlas** (text indexing, aggregation, atomic counters)
- **NextAuth.js** (credentials auth, bcrypt password hashing, avatar generation)
- **DiceBear API** (automatic researcher profile avatars)

---

## 🌟 Key Features

1. **Home (`/`)**:
   - Headline & tagline
   - Large search bar
   - **Contributor avatar preview** under search button showing active researchers who posted
   - **Dead-end counter**: total entries & estimated researcher-hours saved (`entries × 40h`)
   - 6 most recent entries as structured cards with field badges & tags
2. **Search (`/search?q=&field=`)**:
   - Full-text search over titles, hypotheses, methods, outcomes, and tags
   - Field filters (Materials, Chemistry, Biology, Computer Science, Physics, Education, etc.)
   - Dynamic banner: *"N people already tried something similar"*
   - Encouraging empty state linking to log form
3. **Log a Failure (`/log`)**:
   - Complete form: Title, Field, Hypothesis, Method, What happened, Probable reason, Tags, Contributor info
   - Validation & honeypot spam prevention
   - Auto-populates contributor name and links to logged-in user profile
   - Generates sequential atomic `NR-YYYY-NNNN` ID and redirects to the entry page
4. **Entry Page (`/entry/[nr_id]`)**:
   - Clear sections: Hypothesis, Method, What happened, Probable reason
   - "Copy link" button
   - "Cite this" button copying standard citation format:
     `Contributor Name. "Title." NullResult, NR-ID, Month YYYY. URL`
5. **Authentication & Profiles**:
   - Create account (`/auth/register`) with live profile photo preview
   - Login (`/auth/login`) with NextAuth session management
   - Profile pages (`/profile/[userId]`) showing researcher avatar, bio, and their logged failures

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Seed database (17 realistic entries across 6 fields)
npm run seed

# 3. Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

---

## 🧪 Demo Search Queries

- `banana peel` or `bioplastic` → 2 entries (Thomas, Menon)
- `nanoparticles` → Green synthesis of silver nanoparticles
- `resnet` or `leaf disease` → Overfitting in ResNet-18
- `peltier` → DIY PCR thermal cycler
- `moringa` → Microplastics removal failure

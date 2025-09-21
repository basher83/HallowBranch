---
description: Create detailed API contract specification for Next.js/Supabase coordination
model: claude-opus-4-1-20250805
---

# Define API Contract for Next.js/Supabase Integration

Feature: $ARGUMENTS

## Task: Create detailed API contract specification for Next.js/Supabase coordination

1. **Define Next.js API Routes**:

   ```yaml
   Base URL: /api/{feature}

   Routes:
   - GET /api/{features}
     Query params: page, limit, orderBy, filter
     Response: {Feature}ListResponse

   - GET /api/{features}/{id}
     Path param: id (string)
     Response: {Feature}Response

   - POST /api/{features}
     Body: {Feature}Request
     Response: {Feature}Response (201 Created)

   - PUT /api/{features}/{id}
     Path param: id (string)
     Body: {Feature}Request
     Response: {Feature}Response

   - DELETE /api/{features}/{id}
     Path param: id (string)
     Response: 204 No Content
   ```

2. **Define TypeScript interfaces**:

   ```typescript
   // Request interface (for POST/PUT)
   interface {Feature}Request {
     name: string;        // minLength: 2, maxLength: 100
     description?: string; // maxLength: 1000
     // Add domain-specific fields
   }

   // Response interface (for GET)
   interface {Feature}Response {
     id: string;
     name: string;
     description?: string;
     createdAt: string;   // ISO 8601
     updatedAt: string;   // ISO 8601
     // Add computed fields
   }

   // List response wrapper
   interface {Feature}ListResponse {
     data: {Feature}Response[];
     count: number;
     hasMore: boolean;
   }

   // Database types (from Supabase schema)
   interface {Feature}Record {
     id: string;
     name: string;
     description?: string;
     created_at: string;
     updated_at: string;
   }
   ```

3. **Define error responses**:

   ```json
   {
     "error": "Validation failed",
     "message": "Name is required and must be between 2-100 characters",
     "details": {
       "field": "name",
       "received": "",
       "expected": "string (2-100 chars)"
     }
   }
   ```

4. **Define validation rules**:

   - Frontend: Zod schemas for client-side validation
   - Server: TypeScript validation with proper error handling
   - Database: Supabase RLS policies for data integrity

   ```typescript
   // Zod validation schema
   const {Feature}Schema = z.object({
     name: z.string().min(2).max(100),
     description: z.string().max(1000).optional(),
     // Add domain-specific validation
   });

   // Database constraints
   name: required, 2-100 chars
   description: optional, max 1000 chars
   ```

5. **Define status codes**:

   - 200: OK (GET, PUT)
   - 201: Created (POST)
   - 204: No Content (DELETE)
   - 400: Bad Request (validation)
   - 404: Not Found
   - 409: Conflict (duplicate)
   - 500: Internal Server Error

6. **Integration requirements**:

   - CORS: Next.js handles CORS automatically
   - Content-Type: application/json
   - Authentication: Supabase Auth session handling
   - Data fetching: TanStack Query for client-side, Server Components for SSR
   - Real-time: Supabase subscriptions for live updates

7. **Next.js API Route implementation notes**:

   ```typescript
   // nextjs/src/app/api/{features}/route.ts
   import { NextRequest, NextResponse } from "next/server";
   import { createClient } from "@/lib/supabase/server";

   export async function GET(request: NextRequest) {
     const supabase = createClient();
     const { searchParams } = new URL(request.url);
     const page = parseInt(searchParams.get("page") || "1");
     const limit = parseInt(searchParams.get("limit") || "10");

     const { data, error } = await supabase
       .from("{features}")
       .select("*")
       .range((page - 1) * limit, page * limit - 1);

     if (error) {
       return NextResponse.json({ error: error.message }, { status: 500 });
     }

     return NextResponse.json({ data, count: data?.length || 0 });
   }
   ```

8. **Frontend implementation notes**:

   ```typescript
   // Client-side data fetching with TanStack Query
   const { data, isLoading, error } = useQuery({
     queryKey: ['{features}'],
     queryFn: async () => {
       const response = await fetch('/api/{features}');
       if (!response.ok) throw new Error('Failed to fetch');
       return response.json();
     }
   });

   // Server Component data fetching
   async function get{Features}() {
     const supabase = createClient();
     const { data, error } = await supabase
       .from('{features}')
       .select('*');

     return data;
   }

   // Zod schema validation
   const validData = {Feature}Schema.parse(formData);
   ```

Save this contract as: `PRPs/contracts/{feature}-api-contract.md`

Share this file between development team members for alignment on Next.js/Supabase integration patterns.

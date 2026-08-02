create table public.testimonials (
    id uuid primary key default gen_random_uuid(),
    author text not null,
    role text not null,
    quote text not null,
    avatar_url text,
    locale text not null default 'en',
    is_featured boolean not null default false,
    display_order integer default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.testimonials enable row level security;

-- Policy: Testimonials are publicly readable by anyone (visitors and users)
create policy "Testimonials are publicly readable"
    on public.testimonials
    for select
    using (true);

-- Policy: Only authenticated service role / admins can modify testimonials 
-- (adjust this if you build an internal admin dashboard later)
create policy "Allow authenticated users to manage testimonials"
    on public.testimonials
    for all
    using (auth.role() = 'authenticated');
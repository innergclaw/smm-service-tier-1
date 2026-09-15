# Client file delivery

Live route: `https://ownyourweb.marketing/files/`

This route gives OWNYOURWEB and SHOPNASGFX clients one private place to view and download project files. It uses a project code instead of a public project name.

## Client journey

1. The client opens the file delivery route.
2. The client enters the project code from their delivery message.
3. The server checks the code and the recent failed-attempt count.
4. The server returns only the matching project and its visible files.
5. Supabase creates view and download links that expire after 10 minutes.

The browser does not save the code. The code does not appear in the URL.

## New project setup

Create a random code with at least 16 characters. Do not reuse a client name, phone number, birthday, or business name as the code.

The access route accepts codes with seven or more characters for approved legacy or client-specified codes. Use the 16-character standard for every new code unless the client has approved an exception.

Normalize the code before hashing it. Remove spaces and use uppercase letters. Store only the SHA-256 digest.

```sql
insert into public.client_delivery_projects (
  access_code_digest,
  code_hint,
  client_display_name,
  project_name,
  brand,
  status_label,
  delivery_note
)
values (
  encode(extensions.digest('REPLACE_WITH_NORMALIZED_CODE', 'sha256'), 'hex'),
  'LAST_4_CHARACTERS',
  'CLIENT DISPLAY NAME',
  'PROJECT NAME',
  'SHOPNASGFX',
  'Files ready',
  'Your approved files are ready to view and download.'
)
returning id;
```

Use one of these exact brand values:

- `OWNYOURWEB`
- `SHOPNASGFX`
- `OWNYOURWEB + SHOPNASGFX`

## File setup

Upload each file to the private `client-deliveries` bucket. Use the project ID as the first folder name.

Example path:

```text
PROJECT_UUID/final/logo-primary.png
```

Add the matching file record:

```sql
insert into public.client_delivery_files (
  project_id,
  storage_path,
  display_name,
  folder,
  description,
  mime_type,
  extension,
  size_bytes,
  sort_order
)
values (
  'PROJECT_UUID',
  'PROJECT_UUID/final/logo-primary.png',
  'Primary Logo',
  'Final logos',
  'Full-color primary logo with transparent background.',
  'image/png',
  'png',
  0,
  10
);
```

Use the real file size when it is available.

## Delivery message

Send the route and code in the approved client communication channel.

```text
Your project files are ready.

Open: https://ownyourweb.marketing/files/
Project code: YOUR-CODE

Keep this code private. Contact me if you need a new code or have trouble downloading a file.
```

## Code rotation and archive

Replace a code by updating `access_code_digest` and `code_hint`. Disable access by setting `is_active` to `false`. Archive the project only after the agreed delivery and retention period.

Do not place raw access codes in the repository, dashboard notes, filenames, or public URLs.

Render PostgreSQL setup:

1. Create a PostgreSQL database in Render.
2. Copy its external connection string.
3. Set Render backend environment variable:
   ConnectionStrings__BlogprojContext
4. Redeploy the backend service.

Local example connection string:
Host=localhost;Port=5432;Database=blogproj;Username=postgres;Password=postgres

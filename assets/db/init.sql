
---
--- SQL File with schema initiation
---

---
--- Default config
---

---default 0(ms)
SET statement_timeout = 0;
---default 0(ms)
SET lock_timeout = 0;
---default 0(ms)
SET idle_in_transaction_session_timeout = 0;
--default SQL_ASCII
SET client_encoding = 'UTF8';
--default = on
SET standard_conforming_strings = on;
--default = content
SET xmloption = content;
--default = heap
SET default_table_access_method = heap;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;
SET default_tablespace = '';

---
--- Create user, database and access
---

CREATE USER page WITH PASSWORD 'serveruserpass';
CREATE DATABASE webpageserver;
GRANT ALL PRIVILEGES ON DATABASE webpageserver TO page;
\c botpanel


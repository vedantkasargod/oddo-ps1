# Database Update Instructions

## Overview
The signup form now collects comprehensive user data including:
- First Name & Last Name
- Email & Password
- Location & Profession
- Skills they can teach
- Skills they want to learn
- Terms & Marketing agreement preferences

## Steps to Update Your Database

### 1. Connect to MySQL
```bash
mysql -u levelupx_user2 -p -h 172.29.61.234 levelupx2
```

### 2. Run the SQL Update Script
You can either:

**Option A: Run the SQL file directly**
```bash
mysql -u levelupx_user2 -p -h 172.29.61.234 levelupx2 < update_users_table.sql
```

**Option B: Copy and paste the SQL commands**
Open the `update_users_table.sql` file and copy the contents into your MySQL client.

### 3. Verify the Update
After running the SQL, you should see a table structure like this:
```
+------------------+--------------+------+-----+-------------------+-------------------+
| Field            | Type         | Null | Key | Default           | Extra             |
+------------------+--------------+------+-----+-------------------+-------------------+
| id               | int          | NO   | PRI | NULL              | auto_increment    |
| firstName        | varchar(100) | NO   |     | NULL              |                   |
| lastName         | varchar(100) | NO   |     | NULL              |                   |
| email            | varchar(255) | NO   | UNI | NULL              |                   |
| password         | varchar(255) | NO   |     | NULL              |                   |
| location         | varchar(255) | YES  | MUL | NULL              |                   |
| profession       | varchar(255) | YES  | MUL | NULL              |                   |
| skills           | json         | YES  |     | NULL              |                   |
| seeking          | json         | YES  |     | NULL              |                   |
| agreeToTerms     | tinyint(1)   | YES  |     | 0                 |                   |
| agreeToMarketing | tinyint(1)   | YES  |     | 0                 |                   |
| createdAt        | timestamp    | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
| updatedAt        | timestamp    | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
+------------------+--------------+------+-----+-------------------+-------------------+
```

## What Changed

### Frontend (`app/signup/page.tsx`)
- Now sends all form fields to the backend
- Includes: firstName, lastName, email, password, location, profession, skills, seeking, agreeToTerms, agreeToMarketing

### Backend (`backend/index.js`)
- Updated `/api/users` endpoint to accept all fields
- Updated `/api/login` endpoint to return user data with parsed JSON fields
- Added better error handling and logging

### Database Schema
- Added new columns for all signup fields
- Skills and seeking are stored as JSON arrays
- Added timestamps for user creation and updates
- Added indexes for better query performance

## Testing

1. **Restart your backend server:**
   ```bash
   cd backend
   node index.js
   ```

2. **Test the signup form:**
   - Go to your signup page
   - Fill out all steps of the form
   - Submit and check for success message

3. **Check the database:**
   ```sql
   SELECT * FROM users;
   ```

## Troubleshooting

If you get errors:

1. **Check backend logs** for detailed error messages
2. **Verify database connection** - make sure MySQL is running
3. **Check table structure** - run `DESCRIBE users;` to confirm all columns exist
4. **Test with a simple user** - try the optional test insert in the SQL file

## Security Notes

- Passwords are currently stored in plain text (not recommended for production)
- Consider adding password hashing (bcrypt) for production use
- Add input validation and sanitization
- Consider rate limiting for signup/login endpoints 
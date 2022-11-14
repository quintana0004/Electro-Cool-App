@REM This is a step by step of how to start the backend server

@REM --- PRE-REQUESITES ---
@REM 1. Node JS Must Be Installed
@REM 2. Postgre SQL Must Be Installed (Please remember user credentials and database name)

@REM --- Step 1: ENV File ---
@REM 1. Request Backend Engineer for .env file and how to modify it.

@REM --- Step 2 Run Commands ---
@REM 1. Run the following command under the BACKEND FOLDER:
npm install

@REM 2. First CD to the prisma folder
@REM 3. Run the following command to create the SQL tables in your Postgre Database: 
npx prisma migrate dev --name DB

@REM Note: If prompted for any confirmations just input "Yes". Since this is a dev environment it doesnt really have much affects.

@REM 4. Run the following commands to generate the approriate Prisma Types:
npx prisma generate

@REM 5. Run the following command to start the server
npm run dev
CREATE TABLE IF NOT EXISTS "__EFMigrationsHistory" (
    "MigrationId" TEXT NOT NULL CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY,
    "ProductVersion" TEXT NOT NULL
);

BEGIN TRANSACTION;

CREATE TABLE "Departments" (
    "Department_Id" INTEGER NOT NULL CONSTRAINT "PK_Departments" PRIMARY KEY AUTOINCREMENT,
    "Department_Name" TEXT NOT NULL,
    "Team_Member_Id" INTEGER NULL
);

CREATE TABLE "Invoices" (
    "Invoice_Id" INTEGER NOT NULL CONSTRAINT "PK_Invoices" PRIMARY KEY AUTOINCREMENT,
    "Invoice_Date" TEXT NOT NULL,
    "Invoice_DueDate" TEXT NOT NULL,
    "Invoice_TotalAmount" TEXT NOT NULL,
    "Invoice_TaxAmount" TEXT NOT NULL,
    "Invoice_Discount" INTEGER NOT NULL,
    "Invoice_AmountDue" TEXT NOT NULL,
    "Orders_Id" INTEGER NULL,
    "User_Id" INTEGER NULL,
    "Status_Id" INTEGER NULL,
    "Payments_Id" INTEGER NULL
);

CREATE TABLE "Milestones" (
    "Milestone_Id" INTEGER NOT NULL CONSTRAINT "PK_Milestones" PRIMARY KEY AUTOINCREMENT,
    "Milestone_Name" TEXT NOT NULL,
    "Milestone_Description" TEXT NOT NULL,
    "Milestone_DueDate" TEXT NULL,
    "Project_Id" INTEGER NULL
);

CREATE TABLE "Orders" (
    "Order_Id" INTEGER NOT NULL CONSTRAINT "PK_Orders" PRIMARY KEY AUTOINCREMENT,
    "Order_Date" TEXT NULL,
    "Order_Total_Amount" TEXT NULL,
    "User_Id" INTEGER NULL,
    "Status_Id" INTEGER NULL
);

CREATE TABLE "Payments" (
    "Payment_Id" INTEGER NOT NULL CONSTRAINT "PK_Payments" PRIMARY KEY AUTOINCREMENT,
    "Orders_Id" INTEGER NOT NULL,
    "Payment_Date" TEXT NULL,
    "Amount_Paid" TEXT NOT NULL,
    "Payment_Method" INTEGER NOT NULL,
    "Payment_Status_Id" INTEGER NOT NULL
);

CREATE TABLE "Phases" (
    "Phase_Id" INTEGER NOT NULL CONSTRAINT "PK_Phases" PRIMARY KEY AUTOINCREMENT,
    "NamePhase" TEXT NOT NULL,
    "DescPhase" TEXT NULL,
    "DueDate" TEXT NOT NULL,
    "Project_Id" INTEGER NULL,
    "Assigned_To" INTEGER NULL,
    "Status_Id" INTEGER NULL
);

CREATE TABLE "Projects" (
    "Project_Id" INTEGER NOT NULL CONSTRAINT "PK_Projects" PRIMARY KEY AUTOINCREMENT,
    "NameProject" TEXT NOT NULL,
    "DescProject" TEXT NULL,
    "StartDate" TEXT NULL,
    "EndDate" TEXT NULL,
    "Attachments" TEXT NULL,
    "SourceCodeUrl" TEXT NULL,
    "User_Id" INTEGER NULL,
    "Project_Type_Id" INTEGER NULL,
    "Technology_Id" INTEGER NULL,
    "Status_Id" INTEGER NULL
);

CREATE TABLE "Reviews" (
    "Review_Id" INTEGER NOT NULL CONSTRAINT "PK_Reviews" PRIMARY KEY AUTOINCREMENT,
    "Review_Title" TEXT NOT NULL,
    "Review_Desc" TEXT NOT NULL,
    "Review_Comment" TEXT NULL,
    "Review_Rate" INTEGER NULL,
    "Review_Image" TEXT NULL,
    "Review_IsFeatured" INTEGER NULL,
    "Review_Date" TEXT NULL,
    "Review_Status" INTEGER NULL,
    "Review_Privacy" INTEGER NULL,
    "Project_Id" INTEGER NULL,
    "User_Id" INTEGER NULL,
    "Orders_Id" INTEGER NULL,
    "Team_Member_Id" INTEGER NULL
);

CREATE TABLE "Status" (
    "Status_Id" INTEGER NOT NULL CONSTRAINT "PK_Status" PRIMARY KEY AUTOINCREMENT,
    "StatusTypes" INTEGER NULL
);

CREATE TABLE "Teams" (
    "Team_Member_Id" INTEGER NOT NULL CONSTRAINT "PK_Teams" PRIMARY KEY AUTOINCREMENT,
    "NameMember" TEXT NOT NULL,
    "PasswordMember" TEXT NOT NULL,
    "EmailMember" TEXT NULL,
    "FirstNameMember" TEXT NULL,
    "LastNameMember" TEXT NULL,
    "AvatarMember" TEXT NULL,
    "CoverMember" TEXT NULL,
    "TeamInfo_Id" INTEGER NULL,
    "RoleMember" INTEGER NULL
);

CREATE TABLE "Technologies" (
    "Technology_Id" INTEGER NOT NULL CONSTRAINT "PK_Technologies" PRIMARY KEY AUTOINCREMENT,
    "NameTechnology" INTEGER NULL
);

CREATE TABLE "Tickets" (
    "Ticket_Id" INTEGER NOT NULL CONSTRAINT "PK_Tickets" PRIMARY KEY AUTOINCREMENT,
    "Ticket_Title" TEXT NOT NULL,
    "Ticket_Description" TEXT NULL,
    "Ticket_Created_Date" TEXT NULL,
    "Ticket_Resolved_Date" TEXT NULL,
    "Ticket_Attachment" TEXT NULL,
    "Project_Id" INTEGER NULL,
    "Orders_Id" INTEGER NULL,
    "Status_Id" INTEGER NULL,
    "Assigned_To" INTEGER NULL
);

CREATE TABLE "TimeLogs" (
    "TimeLog_Id" INTEGER NOT NULL CONSTRAINT "PK_TimeLogs" PRIMARY KEY AUTOINCREMENT,
    "Team_Member_Id" INTEGER NOT NULL,
    "Phase_Id" INTEGER NOT NULL,
    "Hours_Logged" TEXT NULL,
    "Date_Logged" TEXT NULL
);

CREATE TABLE "Users" (
    "User_Id" INTEGER NOT NULL CONSTRAINT "PK_Users" PRIMARY KEY AUTOINCREMENT,
    "Username" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "Email" TEXT NULL,
    "FirstName" TEXT NULL,
    "LastName" TEXT NULL,
    "Avatar" TEXT NULL,
    "Cover" TEXT NULL,
    "Usersinfo_Id" INTEGER NULL,
    "Role" INTEGER NULL
);

CREATE TABLE "Teams_RefreshTokens" (
    "Id" INTEGER NOT NULL CONSTRAINT "PK_Teams_RefreshTokens" PRIMARY KEY AUTOINCREMENT,
    "Token" TEXT NOT NULL,
    "Expires" TEXT NOT NULL,
    "Created" TEXT NOT NULL,
    "CreatedByIp" TEXT NOT NULL,
    "Revoked" TEXT NULL,
    "RevokedByIp" TEXT NOT NULL,
    "ReplacedByToken" TEXT NOT NULL,
    "ReasonRevoked" TEXT NOT NULL,
    "Team_Member_Id" INTEGER NULL,
    CONSTRAINT "FK_Teams_RefreshTokens_Teams_Team_Member_Id" FOREIGN KEY ("Team_Member_Id") REFERENCES "Teams" ("Team_Member_Id")
);

CREATE TABLE "Users_RefreshTokens" (
    "Id" INTEGER NOT NULL CONSTRAINT "PK_Users_RefreshTokens" PRIMARY KEY AUTOINCREMENT,
    "Token" TEXT NOT NULL,
    "Expires" TEXT NOT NULL,
    "Created" TEXT NOT NULL,
    "CreatedByIp" TEXT NOT NULL,
    "Revoked" TEXT NULL,
    "RevokedByIp" TEXT NOT NULL,
    "ReplacedByToken" TEXT NOT NULL,
    "ReasonRevoked" TEXT NOT NULL,
    "User_Id" INTEGER NOT NULL,
    CONSTRAINT "FK_Users_RefreshTokens_Users_User_Id" FOREIGN KEY ("User_Id") REFERENCES "Users" ("User_Id") ON DELETE CASCADE
);

CREATE INDEX "IX_Teams_RefreshTokens_Team_Member_Id" ON "Teams_RefreshTokens" ("Team_Member_Id");

CREATE INDEX "IX_Users_RefreshTokens_User_Id" ON "Users_RefreshTokens" ("User_Id");

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20241022154020_InitialCreateSQLite', '8.0.8');

COMMIT;


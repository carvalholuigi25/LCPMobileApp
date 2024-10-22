IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

CREATE TABLE [Departments] (
    [Department_Id] int NOT NULL IDENTITY,
    [Department_Name] nvarchar(max) NOT NULL,
    [Team_Member_Id] int NULL,
    CONSTRAINT [PK_Departments] PRIMARY KEY ([Department_Id])
);
GO

CREATE TABLE [Invoices] (
    [Invoice_Id] int NOT NULL IDENTITY,
    [Invoice_Date] datetime2 NOT NULL,
    [Invoice_DueDate] datetime2 NOT NULL,
    [Invoice_TotalAmount] decimal(18,2) NOT NULL,
    [Invoice_TaxAmount] decimal(18,2) NOT NULL,
    [Invoice_Discount] int NOT NULL,
    [Invoice_AmountDue] decimal(18,2) NOT NULL,
    [Orders_Id] int NULL,
    [User_Id] int NULL,
    [Status_Id] int NULL,
    [Payments_Id] int NULL,
    CONSTRAINT [PK_Invoices] PRIMARY KEY ([Invoice_Id])
);
GO

CREATE TABLE [Milestones] (
    [Milestone_Id] int NOT NULL IDENTITY,
    [Milestone_Name] nvarchar(max) NOT NULL,
    [Milestone_Description] nvarchar(max) NOT NULL,
    [Milestone_DueDate] datetime2 NULL,
    [Project_Id] int NULL,
    CONSTRAINT [PK_Milestones] PRIMARY KEY ([Milestone_Id])
);
GO

CREATE TABLE [Orders] (
    [Order_Id] int NOT NULL IDENTITY,
    [Order_Date] datetime2 NULL,
    [Order_Total_Amount] decimal(18,2) NULL,
    [User_Id] int NULL,
    [Status_Id] int NULL,
    CONSTRAINT [PK_Orders] PRIMARY KEY ([Order_Id])
);
GO

CREATE TABLE [Payments] (
    [Payment_Id] int NOT NULL IDENTITY,
    [Orders_Id] int NOT NULL,
    [Payment_Date] datetime2 NULL,
    [Amount_Paid] decimal(18,2) NOT NULL,
    [Payment_Method] int NOT NULL,
    [Payment_Status_Id] int NOT NULL,
    CONSTRAINT [PK_Payments] PRIMARY KEY ([Payment_Id])
);
GO

CREATE TABLE [Phases] (
    [Phase_Id] int NOT NULL IDENTITY,
    [NamePhase] nvarchar(max) NOT NULL,
    [DescPhase] nvarchar(max) NULL,
    [DueDate] datetime2 NOT NULL,
    [Project_Id] int NULL,
    [Assigned_To] int NULL,
    [Status_Id] int NULL,
    CONSTRAINT [PK_Phases] PRIMARY KEY ([Phase_Id])
);
GO

CREATE TABLE [Projects] (
    [Project_Id] int NOT NULL IDENTITY,
    [NameProject] nvarchar(max) NOT NULL,
    [DescProject] nvarchar(max) NULL,
    [StartDate] datetime2 NULL,
    [EndDate] datetime2 NULL,
    [Attachments] nvarchar(max) NULL,
    [SourceCodeUrl] nvarchar(max) NULL,
    [User_Id] int NULL,
    [Project_Type_Id] int NULL,
    [Technology_Id] int NULL,
    [Status_Id] int NULL,
    CONSTRAINT [PK_Projects] PRIMARY KEY ([Project_Id])
);
GO

CREATE TABLE [Reviews] (
    [Review_Id] int NOT NULL IDENTITY,
    [Review_Title] nvarchar(max) NOT NULL,
    [Review_Desc] nvarchar(max) NOT NULL,
    [Review_Comment] nvarchar(max) NULL,
    [Review_Rate] int NULL,
    [Review_Image] nvarchar(max) NULL,
    [Review_IsFeatured] bit NULL,
    [Review_Date] datetime2 NULL,
    [Review_Status] int NULL,
    [Review_Privacy] int NULL,
    [Project_Id] int NULL,
    [User_Id] int NULL,
    [Orders_Id] int NULL,
    [Team_Member_Id] int NULL,
    CONSTRAINT [PK_Reviews] PRIMARY KEY ([Review_Id])
);
GO

CREATE TABLE [Status] (
    [Status_Id] int NOT NULL IDENTITY,
    [StatusTypes] int NULL,
    CONSTRAINT [PK_Status] PRIMARY KEY ([Status_Id])
);
GO

CREATE TABLE [Teams] (
    [Team_Member_Id] int NOT NULL IDENTITY,
    [NameMember] nvarchar(max) NOT NULL,
    [PasswordMember] nvarchar(max) NOT NULL,
    [EmailMember] nvarchar(max) NULL,
    [FirstNameMember] nvarchar(max) NULL,
    [LastNameMember] nvarchar(max) NULL,
    [AvatarMember] nvarchar(max) NULL,
    [CoverMember] nvarchar(max) NULL,
    [TeamInfo_Id] int NULL,
    [RoleMember] int NULL,
    CONSTRAINT [PK_Teams] PRIMARY KEY ([Team_Member_Id])
);
GO

CREATE TABLE [Technologies] (
    [Technology_Id] int NOT NULL IDENTITY,
    [NameTechnology] int NULL,
    CONSTRAINT [PK_Technologies] PRIMARY KEY ([Technology_Id])
);
GO

CREATE TABLE [Tickets] (
    [Ticket_Id] int NOT NULL IDENTITY,
    [Ticket_Title] nvarchar(max) NOT NULL,
    [Ticket_Description] nvarchar(max) NULL,
    [Ticket_Created_Date] datetime2 NULL,
    [Ticket_Resolved_Date] datetime2 NULL,
    [Ticket_Attachment] nvarchar(max) NULL,
    [Project_Id] int NULL,
    [Orders_Id] int NULL,
    [Status_Id] int NULL,
    [Assigned_To] int NULL,
    CONSTRAINT [PK_Tickets] PRIMARY KEY ([Ticket_Id])
);
GO

CREATE TABLE [TimeLogs] (
    [TimeLog_Id] int NOT NULL IDENTITY,
    [Team_Member_Id] int NOT NULL,
    [Phase_Id] int NOT NULL,
    [Hours_Logged] decimal(18,2) NULL,
    [Date_Logged] datetime2 NULL,
    CONSTRAINT [PK_TimeLogs] PRIMARY KEY ([TimeLog_Id])
);
GO

CREATE TABLE [Users] (
    [User_Id] int NOT NULL IDENTITY,
    [Username] nvarchar(max) NOT NULL,
    [Password] nvarchar(max) NOT NULL,
    [Email] nvarchar(max) NULL,
    [FirstName] nvarchar(max) NULL,
    [LastName] nvarchar(max) NULL,
    [Avatar] nvarchar(max) NULL,
    [Cover] nvarchar(max) NULL,
    [Usersinfo_Id] int NULL,
    [Role] int NULL,
    CONSTRAINT [PK_Users] PRIMARY KEY ([User_Id])
);
GO

CREATE TABLE [Teams_RefreshTokens] (
    [Id] int NOT NULL IDENTITY,
    [Token] nvarchar(max) NOT NULL,
    [Expires] datetime2 NOT NULL,
    [Created] datetime2 NOT NULL,
    [CreatedByIp] nvarchar(max) NOT NULL,
    [Revoked] datetime2 NULL,
    [RevokedByIp] nvarchar(max) NOT NULL,
    [ReplacedByToken] nvarchar(max) NOT NULL,
    [ReasonRevoked] nvarchar(max) NOT NULL,
    [Team_Member_Id] int NULL,
    CONSTRAINT [PK_Teams_RefreshTokens] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Teams_RefreshTokens_Teams_Team_Member_Id] FOREIGN KEY ([Team_Member_Id]) REFERENCES [Teams] ([Team_Member_Id])
);
GO

CREATE TABLE [Users_RefreshTokens] (
    [Id] int NOT NULL IDENTITY,
    [Token] nvarchar(max) NOT NULL,
    [Expires] datetime2 NOT NULL,
    [Created] datetime2 NOT NULL,
    [CreatedByIp] nvarchar(max) NOT NULL,
    [Revoked] datetime2 NULL,
    [RevokedByIp] nvarchar(max) NOT NULL,
    [ReplacedByToken] nvarchar(max) NOT NULL,
    [ReasonRevoked] nvarchar(max) NOT NULL,
    [User_Id] int NOT NULL,
    CONSTRAINT [PK_Users_RefreshTokens] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Users_RefreshTokens_Users_User_Id] FOREIGN KEY ([User_Id]) REFERENCES [Users] ([User_Id]) ON DELETE CASCADE
);
GO

CREATE INDEX [IX_Teams_RefreshTokens_Team_Member_Id] ON [Teams_RefreshTokens] ([Team_Member_Id]);
GO

CREATE INDEX [IX_Users_RefreshTokens_User_Id] ON [Users_RefreshTokens] ([User_Id]);
GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20241022154141_InitialCreateSQLServer', N'8.0.8');
GO

COMMIT;
GO


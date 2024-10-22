CREATE TABLE IF NOT EXISTS `__EFMigrationsHistory` (
    `MigrationId` varchar(150) CHARACTER SET utf8mb4 NOT NULL,
    `ProductVersion` varchar(32) CHARACTER SET utf8mb4 NOT NULL,
    CONSTRAINT `PK___EFMigrationsHistory` PRIMARY KEY (`MigrationId`)
) CHARACTER SET=utf8mb4;

START TRANSACTION;

ALTER DATABASE CHARACTER SET utf8mb4;

CREATE TABLE `Departments` (
    `Department_Id` int NOT NULL AUTO_INCREMENT,
    `Department_Name` longtext CHARACTER SET utf8mb4 NOT NULL,
    `Team_Member_Id` int NULL,
    CONSTRAINT `PK_Departments` PRIMARY KEY (`Department_Id`)
) CHARACTER SET=utf8mb4;

CREATE TABLE `Invoices` (
    `Invoice_Id` int NOT NULL AUTO_INCREMENT,
    `Invoice_Date` datetime NOT NULL,
    `Invoice_DueDate` datetime NOT NULL,
    `Invoice_TotalAmount` decimal(65,30) NOT NULL,
    `Invoice_TaxAmount` decimal(65,30) NOT NULL,
    `Invoice_Discount` int NOT NULL,
    `Invoice_AmountDue` decimal(65,30) NOT NULL,
    `Orders_Id` int NULL,
    `User_Id` int NULL,
    `Status_Id` int NULL,
    `Payments_Id` int NULL,
    CONSTRAINT `PK_Invoices` PRIMARY KEY (`Invoice_Id`)
) CHARACTER SET=utf8mb4;

CREATE TABLE `Milestones` (
    `Milestone_Id` int NOT NULL AUTO_INCREMENT,
    `Milestone_Name` longtext CHARACTER SET utf8mb4 NOT NULL,
    `Milestone_Description` longtext CHARACTER SET utf8mb4 NOT NULL,
    `Milestone_DueDate` datetime NULL,
    `Project_Id` int NULL,
    CONSTRAINT `PK_Milestones` PRIMARY KEY (`Milestone_Id`)
) CHARACTER SET=utf8mb4;

CREATE TABLE `Orders` (
    `Order_Id` int NOT NULL AUTO_INCREMENT,
    `Order_Date` datetime NULL,
    `Order_Total_Amount` decimal(65,30) NULL,
    `User_Id` int NULL,
    `Status_Id` int NULL,
    CONSTRAINT `PK_Orders` PRIMARY KEY (`Order_Id`)
) CHARACTER SET=utf8mb4;

CREATE TABLE `Payments` (
    `Payment_Id` int NOT NULL AUTO_INCREMENT,
    `Orders_Id` int NOT NULL,
    `Payment_Date` datetime NULL,
    `Amount_Paid` decimal(65,30) NOT NULL,
    `Payment_Method` int NOT NULL,
    `Payment_Status_Id` int NOT NULL,
    CONSTRAINT `PK_Payments` PRIMARY KEY (`Payment_Id`)
) CHARACTER SET=utf8mb4;

CREATE TABLE `Phases` (
    `Phase_Id` int NOT NULL AUTO_INCREMENT,
    `NamePhase` longtext CHARACTER SET utf8mb4 NOT NULL,
    `DescPhase` longtext CHARACTER SET utf8mb4 NULL,
    `DueDate` datetime NOT NULL,
    `Project_Id` int NULL,
    `Assigned_To` int NULL,
    `Status_Id` int NULL,
    CONSTRAINT `PK_Phases` PRIMARY KEY (`Phase_Id`)
) CHARACTER SET=utf8mb4;

CREATE TABLE `Projects` (
    `Project_Id` int NOT NULL AUTO_INCREMENT,
    `NameProject` longtext CHARACTER SET utf8mb4 NOT NULL,
    `DescProject` longtext CHARACTER SET utf8mb4 NULL,
    `StartDate` datetime NULL,
    `EndDate` datetime NULL,
    `Attachments` longtext CHARACTER SET utf8mb4 NULL,
    `SourceCodeUrl` longtext CHARACTER SET utf8mb4 NULL,
    `User_Id` int NULL,
    `Project_Type_Id` int NULL,
    `Technology_Id` int NULL,
    `Status_Id` int NULL,
    CONSTRAINT `PK_Projects` PRIMARY KEY (`Project_Id`)
) CHARACTER SET=utf8mb4;

CREATE TABLE `Reviews` (
    `Review_Id` int NOT NULL AUTO_INCREMENT,
    `Review_Title` longtext CHARACTER SET utf8mb4 NOT NULL,
    `Review_Desc` longtext CHARACTER SET utf8mb4 NOT NULL,
    `Review_Comment` longtext CHARACTER SET utf8mb4 NULL,
    `Review_Rate` int NULL,
    `Review_Image` longtext CHARACTER SET utf8mb4 NULL,
    `Review_IsFeatured` tinyint(1) NULL,
    `Review_Date` datetime NULL,
    `Review_Status` int NULL,
    `Review_Privacy` int NULL,
    `Project_Id` int NULL,
    `User_Id` int NULL,
    `Orders_Id` int NULL,
    `Team_Member_Id` int NULL,
    CONSTRAINT `PK_Reviews` PRIMARY KEY (`Review_Id`)
) CHARACTER SET=utf8mb4;

CREATE TABLE `Status` (
    `Status_Id` int NOT NULL AUTO_INCREMENT,
    `StatusTypes` int NULL,
    CONSTRAINT `PK_Status` PRIMARY KEY (`Status_Id`)
) CHARACTER SET=utf8mb4;

CREATE TABLE `Teams` (
    `Team_Member_Id` int NOT NULL AUTO_INCREMENT,
    `NameMember` longtext CHARACTER SET utf8mb4 NOT NULL,
    `PasswordMember` longtext CHARACTER SET utf8mb4 NOT NULL,
    `EmailMember` longtext CHARACTER SET utf8mb4 NULL,
    `FirstNameMember` longtext CHARACTER SET utf8mb4 NULL,
    `LastNameMember` longtext CHARACTER SET utf8mb4 NULL,
    `AvatarMember` longtext CHARACTER SET utf8mb4 NULL,
    `CoverMember` longtext CHARACTER SET utf8mb4 NULL,
    `TeamInfo_Id` int NULL,
    `RoleMember` int NULL,
    CONSTRAINT `PK_Teams` PRIMARY KEY (`Team_Member_Id`)
) CHARACTER SET=utf8mb4;

CREATE TABLE `Technologies` (
    `Technology_Id` int NOT NULL AUTO_INCREMENT,
    `NameTechnology` int NULL,
    CONSTRAINT `PK_Technologies` PRIMARY KEY (`Technology_Id`)
) CHARACTER SET=utf8mb4;

CREATE TABLE `Tickets` (
    `Ticket_Id` int NOT NULL AUTO_INCREMENT,
    `Ticket_Title` longtext CHARACTER SET utf8mb4 NOT NULL,
    `Ticket_Description` longtext CHARACTER SET utf8mb4 NULL,
    `Ticket_Created_Date` datetime NULL,
    `Ticket_Resolved_Date` datetime NULL,
    `Ticket_Attachment` longtext CHARACTER SET utf8mb4 NULL,
    `Project_Id` int NULL,
    `Orders_Id` int NULL,
    `Status_Id` int NULL,
    `Assigned_To` int NULL,
    CONSTRAINT `PK_Tickets` PRIMARY KEY (`Ticket_Id`)
) CHARACTER SET=utf8mb4;

CREATE TABLE `TimeLogs` (
    `TimeLog_Id` int NOT NULL AUTO_INCREMENT,
    `Team_Member_Id` int NOT NULL,
    `Phase_Id` int NOT NULL,
    `Hours_Logged` decimal(65,30) NULL,
    `Date_Logged` datetime NULL,
    CONSTRAINT `PK_TimeLogs` PRIMARY KEY (`TimeLog_Id`)
) CHARACTER SET=utf8mb4;

CREATE TABLE `Users` (
    `User_Id` int NOT NULL AUTO_INCREMENT,
    `Username` longtext CHARACTER SET utf8mb4 NOT NULL,
    `Password` longtext CHARACTER SET utf8mb4 NOT NULL,
    `Email` longtext CHARACTER SET utf8mb4 NULL,
    `FirstName` longtext CHARACTER SET utf8mb4 NULL,
    `LastName` longtext CHARACTER SET utf8mb4 NULL,
    `Avatar` longtext CHARACTER SET utf8mb4 NULL,
    `Cover` longtext CHARACTER SET utf8mb4 NULL,
    `Usersinfo_Id` int NULL,
    `Role` int NULL,
    CONSTRAINT `PK_Users` PRIMARY KEY (`User_Id`)
) CHARACTER SET=utf8mb4;

CREATE TABLE `Teams_RefreshTokens` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `Token` longtext CHARACTER SET utf8mb4 NOT NULL,
    `Expires` datetime NOT NULL,
    `Created` datetime NOT NULL,
    `CreatedByIp` longtext CHARACTER SET utf8mb4 NOT NULL,
    `Revoked` datetime NULL,
    `RevokedByIp` longtext CHARACTER SET utf8mb4 NOT NULL,
    `ReplacedByToken` longtext CHARACTER SET utf8mb4 NOT NULL,
    `ReasonRevoked` longtext CHARACTER SET utf8mb4 NOT NULL,
    `Team_Member_Id` int NULL,
    CONSTRAINT `PK_Teams_RefreshTokens` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_Teams_RefreshTokens_Teams_Team_Member_Id` FOREIGN KEY (`Team_Member_Id`) REFERENCES `Teams` (`Team_Member_Id`)
) CHARACTER SET=utf8mb4;

CREATE TABLE `Users_RefreshTokens` (
    `Id` int NOT NULL AUTO_INCREMENT,
    `Token` longtext CHARACTER SET utf8mb4 NOT NULL,
    `Expires` datetime NOT NULL,
    `Created` datetime NOT NULL,
    `CreatedByIp` longtext CHARACTER SET utf8mb4 NOT NULL,
    `Revoked` datetime NULL,
    `RevokedByIp` longtext CHARACTER SET utf8mb4 NOT NULL,
    `ReplacedByToken` longtext CHARACTER SET utf8mb4 NOT NULL,
    `ReasonRevoked` longtext CHARACTER SET utf8mb4 NOT NULL,
    `User_Id` int NOT NULL,
    CONSTRAINT `PK_Users_RefreshTokens` PRIMARY KEY (`Id`),
    CONSTRAINT `FK_Users_RefreshTokens_Users_User_Id` FOREIGN KEY (`User_Id`) REFERENCES `Users` (`User_Id`) ON DELETE CASCADE
) CHARACTER SET=utf8mb4;

CREATE INDEX `IX_Teams_RefreshTokens_Team_Member_Id` ON `Teams_RefreshTokens` (`Team_Member_Id`);

CREATE INDEX `IX_Users_RefreshTokens_User_Id` ON `Users_RefreshTokens` (`User_Id`);

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20241022154229_InitialCreateMySQL', '8.0.8');

COMMIT;


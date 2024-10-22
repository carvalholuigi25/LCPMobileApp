using System.Runtime.Serialization;

namespace LCPMobileAppApi.Models.Enums;

public enum EUsersRoles {
    [EnumMember(Value = "user")]
    user,
    [EnumMember(Value = "moderator")]
    moderator,
    [EnumMember(Value = "admin")]
    admin
}
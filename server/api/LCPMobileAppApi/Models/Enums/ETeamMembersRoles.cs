using System.Runtime.Serialization;

namespace LCPMobileAppApi.Models.Enums;

public enum ETeamsMembersRoles {
    [EnumMember(Value = "member")]
    member,
    [EnumMember(Value = "moderator")]
    moderator,
    [EnumMember(Value = "admin")]
    admin
}
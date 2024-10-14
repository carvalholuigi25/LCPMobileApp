namespace LCPMobileAppApi.Models;

public class QueryParams
{
    private const int MaxPageSize = 50;
    private int _pageSize = 10;

    public int Page { get; set; } = 1;
    public int PageSize
    {
        get { return _pageSize; }
        set { _pageSize = (value > MaxPageSize) ? MaxPageSize : value; }
    }

    public string? SortBy { get; set; } = "id";
    public string? SortOrder { get; set; } = "asc";
    public string? Search { get; set; }
}

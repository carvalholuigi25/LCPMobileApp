using System.Globalization;
using Newtonsoft.Json;

namespace LCPMobileAppApi.Functions;

public static class Functions
{
    public static List<string> GetLanguagesList()
    {
        var fname = $"{Directory.GetCurrentDirectory()}\\languageslist.json";
        StreamReader r = new StreamReader(fname);
        string jsonString = r.ReadToEnd();
        var lst = JsonConvert.DeserializeObject<List<Languages>>(jsonString)!.ToList();
        return lst.Select(x => x.Value)!.ToList()!;
    }

    public static List<Languages> GetLanguagesDetailedList()
    {
        var fname = $"{Directory.GetCurrentDirectory()}\\languageslist.json";
        StreamReader r = new StreamReader(fname);
        string jsonString = r.ReadToEnd();
        var lst = JsonConvert.DeserializeObject<List<Languages>>(jsonString)!.ToList();
        return lst.ToList()!;
    }

    public static List<CultureInfo> GetLanguagesCultureList()
    {
        var glang = GetLanguagesList();
        var lc = new List<CultureInfo>();
        for(var i = 0; i < glang.Count; i++) {
            lc.Add(new CultureInfo(glang[i]));
        }
        return lc;
    }

    public class Languages {
        public int? Id { get; set; }
        public string? Name { get; set; }
        public string? Value { get; set; }
    }
}
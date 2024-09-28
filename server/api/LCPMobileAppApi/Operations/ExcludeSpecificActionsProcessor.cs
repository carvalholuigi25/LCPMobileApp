

using LCPMobileAppApi.Attributes;
using LCPMobileAppApi.Models;
using NSwag.Generation.Processors;
using NSwag.Generation.Processors.Contexts;
using NuGet.Protocol;

namespace LCPMobileAppApi.Operations;

public class ExcludeSpecificActionsProcessor : IOperationProcessor
{
    public bool Process(OperationProcessorContext context)
    {
        var actionAttributes = context.MethodInfo.GetCustomAttributes(true);

        if (actionAttributes.Any(attr => attr is IgnoreAPIAttribute))
        {
            return false;
        }

        return true;
    }
}

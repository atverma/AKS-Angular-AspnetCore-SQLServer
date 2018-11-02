public class AppConfiguration
{
    public string DatabaseConnectionString
    {
        get;
        set;
    }

    public bool IsVaultEnabled
    {
        get;
        set;
    }

    public string Vault
    {
        get;
        set;
    }

    public string ClientId
    {
        get;
        set;
    }

    public string ClientSecret
    {
        get;
        set;
    }

    public string DatabaseConnectionStringFromAppsettings
    {
        get;
        set;
    }

    public string DatabaseConnectionStringFromDockerEnvVariable
    {
        get;
        set;
    }

    public string DatabaseConnectionStringFromKubernetesEnvVariable
    {
        get;
        set;
    }

    public string DatabaseConnectionStringFromKubernetesMountedFile
    {
        get;
        set;
    }

    public string DatabaseConnectionStringFromAzureKeyVault
    {
        get;
        set;
    }

    public string TenantId
    {
        get;
        set;
    }

    public string Audience
    {
        get;
        set;
    }

    public string AzureSignalRConnectionString
    {
        get;
        set;
    }

    public string RedisConnectionString
    {
        get;
        set;
    }
}
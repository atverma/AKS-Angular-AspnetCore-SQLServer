FROM mcr.microsoft.com/dotnet/aspnet:2.2 AS base
WORKDIR /app
EXPOSE 80

ARG dbConnectionString
ENV DatabaseConnectionStringFromDockerEnvVariable $dbConnectionString

FROM mcr.microsoft.com/dotnet/sdk:2.2 AS build
WORKDIR /src
COPY ["samplewebapp/SampleWebApp.csproj", "."]
RUN dotnet restore "SampleWebApp.csproj"
COPY . .
RUN dotnet build "SampleWebApp.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "SampleWebApp.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "SampleWebApp.dll"]

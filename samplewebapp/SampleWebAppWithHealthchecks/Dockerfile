FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src

COPY ["SampleWebAppWithHealthchecks.csproj", "SampleWebAppWithHealthchecks/"]
RUN dotnet restore "SampleWebAppWithHealthchecks/SampleWebAppWithHealthchecks.csproj"
COPY . .

RUN dotnet build "SampleWebAppWithHealthchecks.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "SampleWebAppWithHealthchecks.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "SampleWebAppWithHealthchecks.dll"]

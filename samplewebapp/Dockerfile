FROM microsoft/dotnet:2.1-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 80

ARG dbConnectionString
ENV DatabaseConnectionStringFromDockerEnvVariable $dbConnectionString

FROM microsoft/dotnet:2.1-sdk AS build
WORKDIR /src
COPY ["SampleWebApp/SampleWebApp.csproj", "."]
RUN dotnet restore "SampleWebApp.csproj"
COPY . .
RUN dotnet build "SampleWebApp.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "SampleWebApp.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "SampleWebApp.dll"]
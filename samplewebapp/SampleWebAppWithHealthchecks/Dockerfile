FROM microsoft/dotnet:2.2-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 80

FROM microsoft/dotnet:2.2-sdk AS build
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

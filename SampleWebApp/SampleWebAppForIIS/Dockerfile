# escape=`
FROM microsoft/iis as base

## Install dotnet 2.2.0 hosting pack
SHELL ["powershell", "-Command", "$ErrorActionPreference = 'Stop'; $ProgressPreference = 'Continue'; $verbosePreference='Continue';"]
ADD https://download.visualstudio.microsoft.com/download/pr/48adfc75-bce7-4621-ae7a-5f3c4cf4fc1f/9a8e07173697581a6ada4bf04c845a05/dotnet-hosting-2.2.0-win.exe "C:/setup/dotnet-hosting-2.2.0-win.exe"
RUN start-process -Filepath "C:/setup/dotnet-hosting-2.2.0-win.exe" -ArgumentList @('/install', '/quiet', '/norestart') -Wait 
RUN Remove-Item -Force "C:/setup/dotnet-hosting-2.2.0-win.exe"
## End Install dotnet 2.2.0 hosting pack

## Build and Publish Web App
FROM microsoft/dotnet:2.2-sdk AS build
WORKDIR /src
COPY ["SampleWebAppForIIS/SampleWebAppForIIS.csproj", "SampleWebAppForIIS/"]
RUN dotnet restore "SampleWebAppForIIS/SampleWebAppForIIS.csproj"
COPY . .
WORKDIR "/src/SampleWebAppForIIS"
RUN dotnet build "SampleWebAppForIIS.csproj" --no-restore --no-dependencies -c Release -o /app 
FROM build AS publish
RUN dotnet publish "SampleWebAppForIIS.csproj" -c Release -o /publish
FROM base AS final
WORKDIR /inetpub/wwwroot/samplewebapp
## Create Web Site and Web Application
RUN Import-Module WebAdministration; `
    Remove-Website -Name 'Default Web Site'; `
    New-WebAppPool -Name 'ap-samplewebapp'; `
    Set-ItemProperty IIS:\AppPools\ap-samplewebapp -Name managedRuntimeVersion -Value ''; `
    Set-ItemProperty IIS:\AppPools\ap-samplewebapp -Name enable32BitAppOnWin64 -Value 0; `
    Set-ItemProperty IIS:\AppPools\ap-samplewebapp -Name processModel.identityType -Value Service; `
    New-Website -Name 'samplewebapp' `
                -Port 80 -PhysicalPath 'C:\inetpub\wwwroot\samplewebapp' `
                -ApplicationPool 'ap-samplewebapp' -force
COPY --from=publish /publish .
EXPOSE 80

<div align="center">
<pre>
██████╗ ███████╗███████╗██╗   ██╗███╗   ███╗███████╗
██╔══██╗██╔════╝██╔════╝██║   ██║████╗ ████║██╔════╝
██████╔╝█████╗  ███████╗██║   ██║██╔████╔██║█████╗  
██╔══██╗██╔══╝  ╚════██║██║   ██║██║╚██╔╝██║██╔══╝  
██║  ██║███████╗███████║╚██████╔╝██║ ╚═╝ ██║███████╗
╚═╝  ╚═╝╚══════╝╚══════╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝
        ██╗      █████╗ ███╗   ██╗ ██████╗          
        ██║     ██╔══██╗████╗  ██║██╔════╝          
        ██║     ███████║██╔██╗ ██║██║  ███╗         
        ██║     ██╔══██║██║╚██╗██║██║   ██║         
        ███████╗██║  ██║██║ ╚████║╚██████╔╝         
        ╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝             

---------------------------------------------------------------------------
The best way for you to make your resume scalable.
</pre>
</div>

## About

When you update your resume, there's a lot of other things you need to mess with.

For instance, you need to update your LinkedIn profile, or dig through your portfolio website to figure out where that one bulletpoint lives.

With ResumeLang, those days are long gone. Just modify the `.resume` file, and you're good to go.

## Features

- A novel markup language (`ResumeLang`) made with `pyparsing`
  - Easy for a program to parse
  - But, still easy for humans to read
  - Can emit TypeScript and LaTeX
- Flask API for convenient data updates
  - Update your `.resume` file, and you're set
- A frontend to quickly preview changes
  - Written in react and mantine
- Docker containers. Who doesn't love docker containers

## Getting Started 
### Hosting Locally with Docker (Recommended)

Make sure you have [Docker](https://docs.docker.com/desktop/) and [Docker Compose](https://docs.docker.com/compose/install/) installed.

From the root directory of the repository, run the following command:

```bash
docker-compose up --build
```

This will rebuild all containers. When you're done:

```bash
docker-compose down
```

### Hosting on a Cloud Platform

I used DigitalOcean for this.

You will need to change a few lines of code:

- In `frontend/nginx.conf`, replace `localhost` with the ip of the docker compose.
- In `frontend/src/components/Drop.tsx`, replace the URLs of the API calls with the ip of the docker compose.

From there, same as above. Docker compose up, docker compose down.

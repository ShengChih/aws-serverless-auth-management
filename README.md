# aws-serverless-auth-management

# build image & run container

```
docker-compose --build -d
```

# build frontend static resources

```
cd frontend
pnpm i
pnpm build
```

# deploy serverless resources

```
cd authmgmt
sls deploy --profile serverless-agent]
```

# upload frontend static files to s3

```
aws --profile serverless-agent s3 sync --delete ./frontend/build s3://palapalado.tk/
```

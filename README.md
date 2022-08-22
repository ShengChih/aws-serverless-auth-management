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
sls config credentials --profile --provider aws --key [] --secret []
sls deploy --aws-profile serverless-admin
```

# upload frontend static files to s3

```
aws --profile serverless-admin s3 sync --delete ./frontend/build s3://palapalado.tk/

npm i
npm run build
aws --profile serverless-admin s3 sync --delete ../wild-rydes/dist s3://palapalado.tk/
```

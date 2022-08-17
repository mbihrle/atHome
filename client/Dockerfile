FROM node:18-alpine as builder
WORKDIR /code
COPY ./package.json ./
RUN npm install 
COPY ./ ./
EXPOSE 3000
RUN npm run build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /code/build /usr/share/nginx/html

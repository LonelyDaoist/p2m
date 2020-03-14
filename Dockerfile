FROM node:10.7.0-alpine
ENV CHROME_BIN="/usr/bin/chromium-browser" \
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD="true"
RUN set -x \
    && apk update \
    && apk upgrade \
    && apk add --no-cache \
    udev \
    ttf-freefont \
    chromium

run mkdir -p /home/app
workdir /home/app

copy package* ./
run npm install
copy . .

cmd node index.js

FROM golang:1.24

WORKDIR /usr/src/tiqet-backend

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN go build -v -o /usr/local/bin/tiqet-backend ./...

CMD ["tiqet-backend"]
# NodeJS Client

An example NodeJS client for the Versa protocol, with both sending and receiving variants (enabled by build script)

## Build Scripts

- `build-sender` - Builds the client with sending capabilities
- `build-receiver` - Builds the client with receiving capabilities

In production use, you could likely discard one of these variants, or package the service into a Docker image with only the desired service bundle.

## Usage

Build and run the client with the following command:

```sh
pnpm build-sender
pnpm start
```

## With Docker

Build the image providing the desired feature flag as a build argument:

```sh
docker build --build-arg service=sender .
```

Run the image with the necessary environment variables:

```sh
docker run \
    -e REGISTRY_URL=https://registry.versa.org \
    -e CLIENT_ID=versa_cid_xxxxxxxxxxxxx \
    -e CLIENT_SECRET=versa_csk_xxxxxxxxx \
    -p 8080:8080 \
    87c6faff1243
```

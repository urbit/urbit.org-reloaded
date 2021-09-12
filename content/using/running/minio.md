+++
title = "Self-hosting S3 Storage"
description = "How to set up and self-host MinIO S3 storage"
template = "doc.html"
weight = 2
[extra]
hidetitle = "true"
+++

Adding [S3](https://aws.amazon.com/s3/) storage to Urbit unlocks some great new features, such as the ability to post media to chats and upload custom avatars. This is a guide to self-hosting [MinIO](https://min.io), an S3 compatible block storage solution.

You can read more about S3 in [Configuring S3 Storage](/using/os/s3).

Cloud providers offer off-the-shelf S3 solutions that you can get started with almost immediately. However, if you do not wish to trust them with your uploaded files, you can self-host an S3 solution.

This process requires a working knowledge of the Linux command line and web technologies such as DNS and TLS.

The self-hosting process is almost exactly the same whether you are hosting on your own hardware, or if you are renting a VPS from a cloud provider like DigitalOcean or AWS. Either way, all that you need is a machine running Linux and a domain - for the sake of this guide, `example.com` will be used in place of your custom domain. You should substitute your own domain everywhere the example domain is used in this guide; for example:

- `example.com` should become `yourdomain.tld`,
- `s3.example.com` should become `s3.yourdomain.tld`,

and so on.

Ideally, MinIO would be installed on the same machine that your Urbit planet is hosted on, and run alongside at no extra cost - although it can just as easily be hosted on a separate machine.

## Steps

### (optional) Install Docker

Hosting MinIO via Docker is the simplest option. To install Docker server, follow the relevant guide [here](https://docs.docker.com/engine/install/#server).

If you don't want to install Docker, MinIO does offer independent binaries. The process for running these should be similar, but the next step assumes you are using Docker.

### Install MinIO

Once Docker is installed, we can install and run MinIO by following the steps [here](https://docs.min.io/docs/minio-docker-quickstart-guide.html).

You should only need to run a single command, along the lines of:

```
docker run -d -p 9000:9000 \
  --name minio-urbit \
  -v /mnt/data:/data \
  -e "MINIO_ACCESS_KEY=<access_key>" \
  -e "MINIO_SECRET_KEY=<secret_key>" \
  -e "MINIO_DOMAIN=s3.example.com" \
  minio/minio server /data
```

`/mnt/data` is the path where your uploaded data will be stored on your host machine - you can change this as necessary.

Be sure to add the `MINIO_DOMAIN` environment variable; this tells MinIO to accept virtual host style URLs (`BUCKET.s3.example.com` rather than `s3.example.com/BUCKET`), which are required for compatibility with Urbit.

Your access key and secret key can be anything of your choosing — make sure they're secure! ~ribben-donnyl recommended a handy tool called [minio-keygen](https://github.com/iwittkau/minio-keygen) that will generate secure keys for you. You could also use your `@p` and `+code` for an easy to remember solution.

### Create DNS records

Now, you'll need to point your own domain at your MinIO installation. Via your domain's DNS settings (usually configured on the registrar you bought your domain through), create two `A` records:

- `s3`.example.com, and
- `*.s3`.example.com

Both should point at the IP address of your host machine. If you are hosting on your own hardware, this could require port-forwarding via your router so that your host machine is reachable from outside of your home network.

It's important that you create both records — without the wildcard, you'll be able to access your S3 web interface but not upload/download content from any buckets you create.

DNS records can take a little while to propagate, so don't worry if you type your new URL into your browser and don't see anything yet.

### Configure a TLS certificate

Next, you need to aquire a TLS certificate from Let's Encrypt. TLS ensures that all traffic to and from your S3 installation is encrypted, and is required for your installation to work with Urbit.

The EFF Certbot tool is the easiest way to get a certificate, and [this page](https://certbot.eff.org/instructions) will tell you how to install it depending on your requirements. Select **NGINX** and your operating system for the correct guide.

Once Certbot is installed, you can generate a certificate with the following command:

```
sudo certbot --server https://acme-v02.api.letsencrypt.org/directory \
  -d *.s3.example.com \
  -d s3.example.com \
  --manual --preferred-challenges dns-01 certonly
```

After answering a few questions, you will be prompted with a DNS challenge to prove that you own the domains you are creating certificates for. After successfully completing the DNS challenge, your certificate files will be generated and Certbot will print the paths at which they are located. Take note of these for the next step.

Let's Encrypt certificates expire after 90 days, so don't forget to renew them. You should receive an email (to the address you entered when creating the certs) before they are due to expire. To renew, simply repeat the process listed above.

### Install NGINX

Install the NGINX web server and place the following config file at `/etc/nginx/sites-enabled/s3.example.com`. NGINX will act as a proxy to MinIO, allowing us to use our domain and enable TLS.

```
server {
    listen 443 ssl;
    server_name *.s3.example.com;

    ignore_invalid_headers off;
    client_max_body_size 0;
    proxy_buffering off;

    ssl_certificate /etc/letsencrypt/live/s3.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/s3.example.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    location / {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Host $http_host;

        proxy_pass http://localhost:9000;
    }
}

server {
    listen 80;
    server_name *.s3.example.com;

    if ($host = *.s3.example.com) {
        return 301 https://$host$request_uri;
    }

    return 404;
}
```

Update your `server_name` values, ensure that the paths to your certificate files are correct, and change your `proxy_pass` value if you are running MinIO on a different port.

You can test your configuration with `nginx -t`. Any errors will be printed so that you can rectify them.

Restart NGINX to apply the new configuration.

### Create an S3 bucket

Navigate to your root MinIO endpoint (`https://s3.example.com`) in a browser and sign in using the access key and secret key you entered in step 1.

Create a new bucket with the plus button in the bottom right-hand corner of the interface. In the list of buckets on the left hand side of the interface, you should see an option to change the policy to read/write.

### Configure your ship

Head over to Landscape and enter your root MinIO endpoint (with protocol) in the S3 settings, e.g. `https://s3.example.com`. Enter your access key and secret, and then enter the name of the bucket you created in the previous step.

You can also configure these settings through Dojo as shown [here](/using/os/s3).

### That's it!

You should now be able to upload content using your self-hosted MinIO installation.

## Troubleshooting

Landscape chat will fail silently if it cannot connect to your S3 endpoint to upload media. To get an idea of what's going wrong, open the network tab of your browser dev tools, and observe the request when you try and upload media. You should see a failed request, hopefully with an error code or reason for failure.

- If you see a `mixed-content` error, this means that not every part of the set up is using TLS. Most browsers will refuse to load non-HTTPS content from a secure page.
- If you see a `502 Bad Gateway` error, NGINX is unable to reach your MinIO installation. Check MinIO is running and your `proxy_pass` URL is correct.
- If you get a `Permission denied` error, it's likely that your bucket endpoint is incorrect. Ensure your NGINX config includes the `proxy_set_header` options, and that you passed the `MINIO_DOMAIN` variable when running MinIO - otherwise it will default to using the path URL format, which Urbit does not support.

A good way to test your setup is to `curl` your S3 bucket endpoint (not your root S3 endpoint) and see what response you get. For example, if we have a bucket named 'media':

```
curl https://media.s3.example.com
```

You should get an XML response listing the contents of your bucket.

## Running MinIO and Urbit on the same machine

You may wonder how it's possible to run Urbit alongside our MinIO/NGINX set up if they both need ports 80/443. The answer is to proxy Urbit through NGINX, exactly the same way as MinIO. You can create as many config files in `/etc/nginx/sites-enabled` as you need, and NGINX will direct requests to the relevant one by comparing `server_name` values.

For example, you could have 2 domains pointing to 2 separate NGINX configs:

- `ship-name.example.com` - proxy to port 8080 where Urbit is running, and
- `s3.example.com` - proxy to port 9000 where MinIO is running

Currently, there is no way to specify the HTTP port Landscape runs on, but if 80 is not available at start-up it will try 8080 next. So start NGINX first, and when you boot your ship it should detect that port 80 is in use and use 8080 instead.

# Sustainable Recycling Initiative

This README provides an overview of the deployment steps for setting up your application on two web servers (`Web01` and `Web02`) and configuring a load balancer (`Lb01`) to distribute traffic between the servers. It includes commands for deploying the application, configuring the web servers, and setting up the load balancer to ensure scalability and reliability.

---

## Prerequisites

Before proceeding, ensure the following:

- You have access to three servers: `Web01`, `Web02`, and `Lb01`.
- Your application repository is available for cloning.
- You have the necessary privileges (sudo/root access) to configure the servers.

---

## 1. Deploying the Application on Web Servers

We will deploy the application on both `Web01` and `Web02` servers. Follow the steps below for each web server:

### Step 1: Create the directory for the application
```bash
mkdir -p /var/www/appname
git clone https://username/appname

cd appname
sudo mv * /var/www/appname

sudo chown -R www-data:www-data /var/www/appname
sudo chmod -R 755 /var/www/appname
```

### Step 2: Install necessary dependencies
Ensure that all necessary dependencies are installed on both web servers.
```bash
sudo apt-get update
sudo apt-get install -y python3 python3-pip
pip3 install -r /var/www/appname/requirements.txt
```

### Step 3: Configure the web server
Configure the web server to serve the application. For example, using Nginx:
```bash
sudo apt-get install -y nginx
sudo nano /etc/nginx/sites-available/appname
```
Add the following configuration:
```plaintext
server {
    listen 80;
    server_name your_domain_or_IP;

    location / {
        include proxy_params;
        proxy_pass http://unix:/var/www/appname/appname.sock;
    }
}
```
Enable the configuration and restart Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/appname /etc/nginx/sites-enabled
sudo systemctl restart nginx
```

## 2. Configuring the Load Balancer

We will configure `Lb01` to distribute traffic between `Web01` and `Web02`.

### Step 1: Install HAProxy
```bash
sudo apt-get update
sudo apt-get install haproxy -y
```

### Step 2: Configure HAProxy
Edit the HAProxy configuration file (`/etc/haproxy/haproxy.cfg`):
```bash
sudo nano /etc/haproxy/haproxy.cfg
```

Add the following configuration:
```plaintext
# Define the backend servers (Web01 and Web02)
backend app_servers
    balance roundrobin  # Load balancing algorithm
    server Web01 Web01_IP_address:80 check
    server Web02 Web02_IP_address:80 check

# Frontend settings to accept incoming traffic
frontend http_front
    bind *:80  # Listen on port 80
    default_backend app_servers
```

### Step 3: Enable and Start HAProxy
```bash
sudo systemctl enable haproxy
sudo systemctl start haproxy
```

---

By following these steps, you will have successfully deployed your application on two web servers and configured a load balancer to manage traffic between them. This setup ensures that your application is scalable and reliable.
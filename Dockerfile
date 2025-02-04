FROM nginx:1.21
COPY /home/runner/work/dashboard/dashboard/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/vhosts.d/dashboard.conf
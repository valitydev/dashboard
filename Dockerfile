FROM nginx:1.31.10
COPY dist/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/vhosts.d/dashboard.conf
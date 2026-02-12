FROM nginx:1.29
COPY dist/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/vhosts.d/dashboard.conf
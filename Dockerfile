FROM nginx:1.27
COPY dist/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/vhosts.d/dashboard.conf
FROM nginx:1.31.9
COPY dist/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/vhosts.d/dashboard.conf
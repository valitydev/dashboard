FROM nginx:1.21

RUN useradd -s /bin/false -U -u 2001 vality
COPY --chown=vality:vality dist /usr/share/nginx/html
COPY --chown=vality:vality nginx.conf /etc/nginx/vhosts.d/dashboard.conf

USER vality

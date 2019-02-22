npm run build-prod

pm2 stop 'admin-screen.vibbidi.net'
pm2 delete 'admin-screen.vibbidi.net'
pm2 start process_prod.json --no-daemon --name "admin-screen.vibbidi.net"

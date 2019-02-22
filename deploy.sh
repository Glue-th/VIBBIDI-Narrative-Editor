pm2 stop 'admin-screen.vibbidi.net'
pm2 delete 'admin-screen.vibbidi.net'
pm2 start npm --name 'admin-screen.vibbidi.net' -- start

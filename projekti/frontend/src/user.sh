#/bin/bash
wget --header "Content-Type:application/json" --post-data '{"name": "test", "username":"tester", "password": "salasana"}' http://localhost:3003/api/users


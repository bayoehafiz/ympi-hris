## YMPI HRIS!
Please read this guide carefully before proceeding:

### Requirements
1. **Apache**/**Nginx** web server
2. **PHP** (version 5.6 recommended)
3. **MySQL** DB server (version 5 recommended)
4. Stable internet connection!

### Installation
1. Find `config.js.example` file under root folder and rename it to `config.js` 
2. Open file `config.js` and change `BASE_URL` into something based on your web server config (don't forget to include the path/subdomain if there's any)
3. Find `/php/config/conn.php` file and set your database credentials in there
4. Import all database scheme inside folder `db`
5. You're all set!

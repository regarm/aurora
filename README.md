# Aurora Online Judge


## Production

coming soon ...

## Development
 - Clone the repo 

  ```
  $ git clone https://github.com/regarmanojkumar/aurora
  ```
 
 
 - Change location of npm global packages to directory with write access by normal user
 
  ```
  $ mkdir -p /path/to/node_modules_global
  $ npm config set prefix=/path/to/node_modules_global
  ```
  
  
  Append the following line to your .profile or .bash_profile and restart the terminal.
   
    ```
    export PATH="/path/to/.node_modules_global/bin:$PATH"
    ```
   
 - Link local modules
 
  ```
  $ cd aurora/auroradb		;Change working directory to auroradb
  $ npm link
  $ cd aurora/auroraweb		;Change working directory to auoraweb
  $ npm link auroradb
  ```
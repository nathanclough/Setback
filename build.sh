#! /bin/bash
(cd api/onConnect && npm run build && cd ../../ ) 
(cd api/onDisconnect && npm run build && cd ../../ ) 
(cd api/onDefault && npm run build && cd ../../ ) 

(cd CommonLayer/ && npm run build && cd ..)
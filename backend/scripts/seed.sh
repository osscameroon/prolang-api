#!/bin/bash

FOLDER='../dumpdata'

mongoimport --uri "mongodb://root:secret@localhost:27047/admin" --collection languages --file $FOLDER/languages.json
mongoimport --uri "mongodb://root:secret@localhost:27047/admin" --collection authors --file $FOLDER/authors.json
mongoimport --uri "mongodb://root:secret@localhost:27047/admin" --collection years_groups --file $FOLDER/years_groups.json



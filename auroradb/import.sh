#!/bin/bash
mongoimport --db aurora --collection contest --file schema/contest.json
mongoimport --db aurora --collection io --file schema/io.json
mongoimport --db aurora --collection lang --file schema/lang.json
mongoimport --db aurora --collection problem --file schema/problem.json
mongoimport --db aurora --collection submission --file schema/submission.json
mongoimport --db aurora --collection user --file schema/user.json
